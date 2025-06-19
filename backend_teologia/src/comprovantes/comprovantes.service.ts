// src/comprovantes/comprovantes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import { format } from 'date-fns';

@Injectable()
export class ComprovantesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Gera um comprovante em PDF e devolve como Readable (Node.js).
   */
  async gerarComprovante(pagamentoId: string): Promise<NodeJS.ReadableStream> {
    /* ─────────────── Consulta Prisma ─────────────── */
    const pagamento = await this.prisma.pagamento.findUnique({
      where: { id: pagamentoId },
      include: {
        mensalidade: {
          include: { aluno: true },
        },
      },
    });

    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado.');
    }

    const { mensalidade, valorPago, dataPagamento } = pagamento;
    const { aluno, vencimento } = mensalidade;

    const mes = format(vencimento, 'MM');
    const ano = format(vencimento, 'yyyy');

    /* ─────────────── Geração do PDF ─────────────── */
    const doc = new PDFDocument({ margin: 50 });
    const stream = new PassThrough(); // Readable do Node
    doc.pipe(stream);

    // Cabeçalho
    doc
      .fontSize(20)
      .text('Comprovante de Pagamento', { align: 'center' })
      .moveDown(1.5);

    // Corpo
    doc
      .fontSize(14)
      .text(`Aluno: ${aluno.nome}`)
      .text(`E-mail: ${aluno.email}`)
      .text(
        `Data do Pagamento: ${format(dataPagamento, 'dd/MM/yyyy')}`,
      )
      .text(`Valor Pago: R$ ${valorPago.toFixed(2).replace('.', ',')}`)
      .text(`Referente à Mensalidade: ${mes}/${ano}`)
      .moveDown()
      .text('Pagamento confirmado com sucesso.', { align: 'left' });

    doc.end();
    return stream;
  }
}
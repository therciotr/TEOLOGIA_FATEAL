import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

/**
 * 📦 ComprovantesService
 * Serviço responsável por gerar comprovantes relacionados a pagamentos.
 */
@Injectable()
export class ComprovantesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🔹 Gera um comprovante real em PDF.
   * @param pagamentoId - ID do pagamento
   * @returns PDF gerado (stream)
   */
  async gerarComprovante(pagamentoId: string): Promise<NodeJS.ReadableStream> {
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

    const aluno = pagamento.mensalidade.aluno;

    // 📄 Geração do PDF
    const doc = new PDFDocument();
    const stream = new PassThrough();
    doc.pipe(stream);

    doc.fontSize(20).text('📄 Comprovante de Pagamento', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Aluno: ${aluno.nome}`);
    doc.text(`E-mail: ${aluno.email}`);
    doc.text(`Data do Pagamento: ${new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR')}`);
    doc.text(`Valor Pago: R$ ${pagamento.valor.toFixed(2).replace('.', ',')}`);
    doc.text(`Referente à Mensalidade: ${pagamento.mensalidade.mes}/${pagamento.mensalidade.ano}`);
    doc.moveDown();
    doc.text('Pagamento confirmado com sucesso.', { align: 'left' });

    doc.end();

    return stream;
  }
}
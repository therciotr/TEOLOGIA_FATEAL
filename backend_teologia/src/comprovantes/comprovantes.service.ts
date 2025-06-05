import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ComprovantesService {
  constructor(private prisma: PrismaService) {}

  async gerarComprovante(pagamentoId: string) {
    const pagamento = await this.prisma.pagamento.findUnique({
      where: { id: pagamentoId },
      include: { mensalidade: { include: { aluno: true } } },
    });

    if (!pagamento) throw new Error('Pagamento não encontrado.');

    // Aqui poderia gerar um PDF real (ex.: com PDFKit) e retornar o link ou buffer.
    return {
      message: `Comprovante do pagamento do aluno ${pagamento.mensalidade.aluno.nome} gerado.`,
      pagamento,
    };
  }
}
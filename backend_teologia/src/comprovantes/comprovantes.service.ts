// src/comprovantes/comprovantes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service'; // ✅ Usando alias @ para padronizar

/**
 * 📦 ComprovantesService
 * Serviço responsável por gerar comprovantes relacionados a pagamentos.
 */
@Injectable()
export class ComprovantesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🔹 Gera um comprovante simples para um pagamento específico.
   * @param pagamentoId - ID do pagamento
   * @returns Comprovante gerado
   */
  async gerarComprovante(pagamentoId: string) {
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

    return {
      message: `Comprovante do pagamento do aluno ${pagamento.mensalidade.aluno.nome} gerado.`,
      pagamento,
    };
  }
}
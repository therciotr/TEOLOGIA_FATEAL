// src/pagamentos/pagamentos.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PagamentosBancosService } from './pagamentos-bancos.service';
import { Response } from 'express';

/**
 * 📦 PagamentosService
 * Serviço responsável pela lógica de pagamentos e integração com bancos.
 */
@Injectable()
export class PagamentosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bancosService: PagamentosBancosService,
  ) {}

  /**
   * 🔹 Realiza o pagamento usando o banco especificado.
   */
  async pagarBanco(banco: string, dadosPagamento: any) {
    if (!banco || !dadosPagamento) {
      throw new HttpException(
        'Banco ou dados de pagamento não informados!',
        HttpStatus.BAD_REQUEST,
      );
    }

    switch (banco) {
      case 'bb':
        return this.bancosService.pagarComBancoDoBrasil(dadosPagamento);
      // ✅ Adicione aqui outros bancos suportados se necessário
      default:
        throw new HttpException(
          `Banco ${banco} não suportado!`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  /**
   * 🔹 Cria um novo registro de pagamento no banco.
   */
  async create(data: any) {
    return this.prisma.pagamento.create({ data });
  }

  /**
   * 🔹 Retorna todos os pagamentos, incluindo mensalidades associadas.
   */
  async findAll() {
    return this.prisma.pagamento.findMany({
      include: { mensalidade: true },
    });
  }

  /**
   * 🔹 Marca uma mensalidade como "pago".
   */
  async pagar(id: string) {
    await this.prisma.mensalidade.update({
      where: { id },
      data: { status: 'pago' },
    });

    return { message: `Pagamento da mensalidade ${id} realizado com sucesso!` };
  }

  /**
   * 🔹 Gera um comprovante de pagamento (PDF - mockup).
   */
  async gerarComprovante(id: string, res: Response) {
    res.setHeader('Content-Type', 'application/pdf');
    res.send('Comprovante gerado em PDF! (mockup)');
  }
}
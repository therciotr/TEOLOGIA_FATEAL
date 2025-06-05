import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PagamentosBancosService } from './pagamentos-bancos.service';
import { Response } from 'express';

/**
 * Service principal de Pagamentos.
 * - Integrações com APIs de bancos.
 * - Pagamento de mensalidades locais.
 * - Geração de comprovantes em PDF (mockup).
 */
@Injectable()
export class PagamentosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bancosService: PagamentosBancosService,
  ) {}

  /**
   * Método dinâmico para integração de pagamento com bancos.
   * @param banco Nome do banco (bb, mercadopago, bradesco, etc).
   * @param dadosPagamento Dados para enviar ao banco.
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
      case 'mercadopago':
        return this.bancosService.pagarComMercadoPago(dadosPagamento);
      case 'bradesco':
        return this.bancosService.pagarComBradesco(dadosPagamento);
      case 'santander':
        return this.bancosService.pagarComSantander(dadosPagamento);
      case 'caixa':
        return this.bancosService.pagarComCaixa(dadosPagamento);
      case 'sicredi':
        return this.bancosService.pagarComSicredi(dadosPagamento);
      default:
        throw new HttpException(
          `Banco ${banco} não suportado!`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  /**
   * Cria um novo pagamento (no banco local, por ex: ao receber confirmação).
   * @param data Dados do pagamento a criar.
   */
  async create(data: any) {
    if (!data) {
      throw new HttpException('Dados não informados!', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.pagamento.create({ data });
  }

  /**
   * Lista todos os pagamentos com detalhes das mensalidades.
   */
  async findAll() {
    return this.prisma.pagamento.findMany({
      include: { mensalidade: true },
    });
  }

  /**
   * Executa um pagamento real (atualiza status de mensalidade, por exemplo).
   * @param id ID do pagamento/mensalidade.
   */
  async pagar(id: string) {
    if (!id) {
      throw new HttpException('ID não informado!', HttpStatus.BAD_REQUEST);
    }

    // Lógica de atualização no banco
    await this.prisma.mensalidade.update({
      where: { id },
      data: { status: 'pago' },
    });

    return { message: `Pagamento do ID ${id} realizado com sucesso!` };
  }

  /**
   * Gera um comprovante em PDF (mockup real).
   * @param id ID do pagamento.
   * @param res Objeto de resposta do Express.
   */
  async gerarComprovante(id: string, res: Response) {
    if (!id) {
      throw new HttpException('ID não informado!', HttpStatus.BAD_REQUEST);
    }

    // Mockup de geração de PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.send('Comprovante gerado em PDF! (mockup)');
  }
}
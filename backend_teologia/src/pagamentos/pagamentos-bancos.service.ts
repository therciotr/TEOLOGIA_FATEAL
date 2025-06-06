// src/pagamentos/pagamentos-bancos.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Ajuste correto no NestJS 11+
import { firstValueFrom } from 'rxjs';

/**
 * Serviço de integrações reais com APIs de pagamento.
 */
@Injectable()
export class PagamentosBancosService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Integração com API do Banco do Brasil.
   */
  async pagarComBancoDoBrasil(dadosPagamento: any) {
    const url = 'https://api.bb.com.br/pagamentos';
    const token = 'Bearer seu_token_banco_do_brasil_aqui';

    try {
      const response$ = this.httpService.post(url, dadosPagamento, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erro ao pagar com Banco do Brasil: ${error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Exemplos dos outros métodos:
   */
  async pagarComMercadoPago(dadosPagamento: any) {
    // Ajuste similar para Mercado Pago
    return { message: 'Pagamento com Mercado Pago realizado (mockup)' };
  }

  async pagarComBradesco(dadosPagamento: any) {
    return { message: 'Pagamento com Bradesco realizado (mockup)' };
  }

  async pagarComSantander(dadosPagamento: any) {
    return { message: 'Pagamento com Santander realizado (mockup)' };
  }

  async pagarComCaixa(dadosPagamento: any) {
    return { message: 'Pagamento com Caixa realizado (mockup)' };
  }

  async pagarComSicredi(dadosPagamento: any) {
    return { message: 'Pagamento com Sicredi realizado (mockup)' };
  }
}
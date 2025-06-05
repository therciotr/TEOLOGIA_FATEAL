import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

/**
 * Service de integrações reais com APIs de pagamento de bancos e provedores.
 * 📁 src/pagamentos/pagamentos-bancos.service.ts
 */
@Injectable()
export class PagamentosBancosService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Integração com a API do Banco do Brasil
   */
  async pagarComBancoDoBrasil(dadosPagamento: any) {
    const url = 'https://api.bb.com.br/pagamentos';
    const token = 'Bearer seu_token_banco_do_brasil_aqui';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, dadosPagamento, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erro ao pagar com Banco do Brasil: ${error.response?.data?.error || error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Integração com a API do Mercado Pago
   */
  async pagarComMercadoPago(dadosPagamento: any) {
    const url = 'https://api.mercadopago.com/v1/payments';
    const token = 'Bearer seu_token_mercado_pago_aqui';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, dadosPagamento, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erro ao pagar com Mercado Pago: ${error.response?.data?.error || error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Integração com a API do Bradesco
   */
  async pagarComBradesco(dadosPagamento: any) {
    const url = 'https://api.bradesco.com.br/pagamentos';
    const token = 'Bearer seu_token_bradesco_aqui';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, dadosPagamento, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erro ao pagar com Bradesco: ${error.response?.data?.error || error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Integração com a API do Santander
   */
  async pagarComSantander(dadosPagamento: any) {
    const url = 'https://api.santander.com.br/pagamentos';
    const token = 'Bearer seu_token_santander_aqui';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, dadosPagamento, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erro ao pagar com Santander: ${error.response?.data?.error || error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Integração com a API da Caixa Econômica Federal
   */
  async pagarComCaixa(dadosPagamento: any) {
    const url = 'https://api.caixa.gov.br/pagamentos';
    const token = 'Bearer seu_token_caixa_aqui';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, dadosPagamento, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erro ao pagar com Caixa Econômica: ${error.response?.data?.error || error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Integração com a API do Sicredi
   */
  async pagarComSicredi(dadosPagamento: any) {
    const url = 'https://api.sicredi.com.br/pagamentos';
    const token = 'Bearer seu_token_sicredi_aqui';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, dadosPagamento, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erro ao pagar com Sicredi: ${error.response?.data?.error || error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
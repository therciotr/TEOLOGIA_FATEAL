// src/pagamentos/pagamentos-bancos.service.ts
import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError, map, throwError, of, timeout } from 'rxjs';

interface PSPResponse {
  status: string;
  data: Record<string, unknown>;
}

@Injectable()
export class PagamentosBancosService {
  private readonly logger = new Logger(PagamentosBancosService.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  /* ───────────────────────── Banco do Brasil ───────────────────────── */
  async pagarComBancoDoBrasil(dadosPagamento: any): Promise<PSPResponse> {
    const url =
      this.config.get<string>('BB_API_URL') ??
      'https://api.bb.com.br/pagamentos';
    const token =
      this.config.get<string>('BB_TOKEN') ?? 'Bearer seu_token_aqui';

    return this.requestPSP(url, token, dadosPagamento);
  }

  /* ───────────────────────── Mercado Pago (mock) ───────────────────── */
  async pagarComMercadoPago(dadosPagamento: any): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Mercado Pago mock' } };
  }

  async pagarComBradesco(dadosPagamento: any): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Bradesco mock' } };
  }

  async pagarComSantander(dadosPagamento: any): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Santander mock' } };
  }

  async pagarComCaixa(dadosPagamento: any): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Caixa mock' } };
  }

  async pagarComSicredi(dadosPagamento: any): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Sicredi mock' } };
  }

  /* ───────────────────────── Utilitário genérico ───────────────────── */
  private async requestPSP(
    url: string,
    token: string,
    payload: unknown,
  ): Promise<PSPResponse> {
    const observable$ = this.http
      .post(url, payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        timeout(8000),
        map((res) => ({ status: 'ok', data: res.data } as PSPResponse)),
        catchError((err) => {
          const msg =
            err.response?.data?.message ||
            err.message ||
            'Erro desconhecido no PSP';
          this.logger.error(`PSP error: ${msg}`);
          return throwError(
            () =>
              new HttpException(
                `Falha de pagamento: ${msg}`,
                HttpStatus.BAD_GATEWAY,
              ),
          );
        }),
      );

    return firstValueFrom(observable$);
  }
}
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout, map, catchError, throwError } from 'rxjs';

/* ------------------------------------------------------------------
 * Interface padrão de resposta dos PSPs (Payment Service Providers)
 * ----------------------------------------------------------------*/
export interface PSPResponse {
  status: 'ok' | 'error';
  data: Record<string, unknown>;
}

/**
 * 📦 PagamentosBancosService
 * Centraliza integração com PSPs/bancos externos (BB, Bradesco, etc.).
 * Cada wrapper chama o método genérico `requestPSP()` com URL, token e payload.
 */
@Injectable()
export class PagamentosBancosService {
  private readonly logger = new Logger(PagamentosBancosService.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  /* ───────────────────────── Banco do Brasil ───────────────────── */
  async pagarComBancoDoBrasil(dadosPagamento: unknown): Promise<PSPResponse> {
    const url = this.config.get<string>('BB_API_URL') ?? 'https://api.bb.com.br/pagamentos';
    const token = this.config.get<string>('BB_TOKEN') ?? 'Bearer seu_token_aqui';
    return this.requestPSP(url, token, dadosPagamento);
  }

  /* ───────────────────────── PSPs MOCKS ────────────────────────── */
  async pagarComMercadoPago(dados: unknown): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Mercado Pago mock' } } as const;
  }

  async pagarComBradesco(dados: unknown): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Bradesco mock' } } as const;
  }

  async pagarComSantander(dados: unknown): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Santander mock' } } as const;
  }

  async pagarComCaixa(dados: unknown): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Caixa mock' } } as const;
  }

  async pagarComSicredi(dados: unknown): Promise<PSPResponse> {
    return { status: 'ok', data: { message: 'Sicredi mock' } } as const;
  }

  /* ─────────────────── Método genérico de requisição ───────────── */
  private async requestPSP(url: string, token: string, payload: unknown): Promise<PSPResponse> {
    const timeoutMs = Number(this.config.get<string>('PSP_TIMEOUT_MS') ?? 8000);

    const observable$ = this.http
      .post(url, payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        timeout(timeoutMs),
        map((res) => ({ status: 'ok' as const, data: res.data as Record<string, unknown> })),
        catchError((err) => {
          const msg = err.response?.data?.message ?? err.message ?? 'Erro desconhecido no PSP';
          this.logger.error(`PSP error: ${msg}`);
          return throwError(() => new HttpException(`Falha de pagamento: ${msg}`, HttpStatus.BAD_GATEWAY));
        }),
      );

    return firstValueFrom(observable$);
  }
}

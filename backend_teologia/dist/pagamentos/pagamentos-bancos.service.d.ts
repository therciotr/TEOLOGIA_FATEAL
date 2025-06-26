import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export interface PSPResponse {
    status: 'ok' | 'error';
    data: Record<string, unknown>;
}
export declare class PagamentosBancosService {
    private readonly http;
    private readonly config;
    private readonly logger;
    constructor(http: HttpService, config: ConfigService);
    pagarComBancoDoBrasil(dadosPagamento: unknown): Promise<PSPResponse>;
    pagarComMercadoPago(dados: unknown): Promise<PSPResponse>;
    pagarComBradesco(dados: unknown): Promise<PSPResponse>;
    pagarComSantander(dados: unknown): Promise<PSPResponse>;
    pagarComCaixa(dados: unknown): Promise<PSPResponse>;
    pagarComSicredi(dados: unknown): Promise<PSPResponse>;
    private requestPSP;
}

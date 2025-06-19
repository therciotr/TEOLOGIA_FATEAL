import { MetodoPagamento } from '@prisma/client';
export declare class CreatePagamentoDto {
    mensalidadeId: string;
    valorPago: number;
    dataPagamento?: string;
    metodo: MetodoPagamento;
    observacao?: string;
}

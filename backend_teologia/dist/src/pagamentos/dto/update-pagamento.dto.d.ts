import { CreatePagamentoDto } from './create-pagamento.dto';
import { MetodoPagamento } from '@prisma/client';
declare const UpdatePagamentoDto_base: import("@nestjs/common").Type<Partial<CreatePagamentoDto>>;
export declare class UpdatePagamentoDto extends UpdatePagamentoDto_base {
    mensalidadeId?: string;
    valorPago?: number;
    dataPagamento?: string;
    metodo?: MetodoPagamento;
    observacao?: string;
}
export {};

import { Response } from 'express';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
export declare class PagamentosController {
    private readonly service;
    constructor(service: PagamentosService);
    pagarBanco(banco: string, dto: CreatePagamentoDto): Promise<import("./pagamentos-bancos.service").PSPResponse>;
    create(dto: CreatePagamentoDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        mensalidadeId: string;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        dataPagamento: Date;
        metodo: import(".prisma/client").$Enums.MetodoPagamento;
    }>;
    findAll(): Promise<({
        mensalidade: {
            status: import(".prisma/client").$Enums.MensalidadeStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            alunoId: string;
            valor: import("@prisma/client/runtime/library").Decimal;
            vencimento: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        mensalidadeId: string;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        dataPagamento: Date;
        metodo: import(".prisma/client").$Enums.MetodoPagamento;
    })[]>;
    findOne(id: string): Promise<{
        mensalidade: {
            status: import(".prisma/client").$Enums.MensalidadeStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            alunoId: string;
            valor: import("@prisma/client/runtime/library").Decimal;
            vencimento: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        mensalidadeId: string;
        valorPago: import("@prisma/client/runtime/library").Decimal;
        dataPagamento: Date;
        metodo: import(".prisma/client").$Enums.MetodoPagamento;
    }>;
    quitarMensalidade(mensalidadeId: string): Promise<{
        message: string;
    }>;
    gerarComprovante(id: string, res: Response): Promise<void>;
}

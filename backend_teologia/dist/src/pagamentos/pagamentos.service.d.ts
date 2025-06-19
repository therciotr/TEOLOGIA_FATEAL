import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Firestore } from 'firebase-admin/firestore';
import { PagamentosBancosService, PSPResponse } from './pagamentos-bancos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
export declare class PagamentosService {
    private readonly prisma;
    private readonly bancos;
    private readonly firestore;
    constructor(prisma: PrismaService, bancos: PagamentosBancosService, firestore: Firestore);
    pagarBanco(banco: string, dadosPagamento: unknown): Promise<PSPResponse>;
    create(dto: CreatePagamentoDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        mensalidadeId: string;
        valorPago: Prisma.Decimal;
        dataPagamento: Date;
        metodo: import(".prisma/client").$Enums.MetodoPagamento;
    }>;
    findAll(): Prisma.PrismaPromise<({
        mensalidade: {
            status: import(".prisma/client").$Enums.MensalidadeStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            alunoId: string;
            valor: Prisma.Decimal;
            vencimento: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        mensalidadeId: string;
        valorPago: Prisma.Decimal;
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
            valor: Prisma.Decimal;
            vencimento: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        mensalidadeId: string;
        valorPago: Prisma.Decimal;
        dataPagamento: Date;
        metodo: import(".prisma/client").$Enums.MetodoPagamento;
    }>;
    update(id: string, dto: UpdatePagamentoDto): Promise<{
        mensalidade: {
            status: import(".prisma/client").$Enums.MensalidadeStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            alunoId: string;
            valor: Prisma.Decimal;
            vencimento: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        mensalidadeId: string;
        valorPago: Prisma.Decimal;
        dataPagamento: Date;
        metodo: import(".prisma/client").$Enums.MetodoPagamento;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    quitarMensalidade(mensalidadeId: string): Promise<{
        message: string;
    }>;
    gerarComprovanteMock(id: string): Promise<string>;
}

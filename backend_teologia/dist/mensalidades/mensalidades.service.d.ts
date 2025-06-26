import { Prisma } from '@prisma/client';
import { Firestore } from 'firebase-admin/firestore';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';
export declare class MensalidadesService {
    private readonly prisma;
    private readonly firestore;
    private readonly logger;
    constructor(prisma: PrismaService, firestore: Firestore);
    private castDecimals;
    private toFirestore;
    private get collection();
    private commitBatch;
    private getFreeBatch;
    create(dto: CreateMensalidadeDto): Promise<{
        status: import(".prisma/client").$Enums.MensalidadeStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        alunoId: string;
        valor: Prisma.Decimal;
        vencimento: Date;
    }>;
    findAll(): Prisma.PrismaPromise<({
        aluno: {
            nome: string;
            email: string;
            telefone: string | null;
            dataNascimento: Date | null;
            endereco: string | null;
            rg: string | null;
            cpf: string | null;
            turmaId: string | null;
            matriculaPaga: boolean;
            fotoUrl: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        pagamentos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            mensalidadeId: string;
            valorPago: Prisma.Decimal;
            dataPagamento: Date;
            metodo: import(".prisma/client").$Enums.MetodoPagamento;
        }[];
    } & {
        status: import(".prisma/client").$Enums.MensalidadeStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        alunoId: string;
        valor: Prisma.Decimal;
        vencimento: Date;
    })[]>;
    findOne(id: string): Prisma.Prisma__MensalidadeClient<({
        aluno: {
            nome: string;
            email: string;
            telefone: string | null;
            dataNascimento: Date | null;
            endereco: string | null;
            rg: string | null;
            cpf: string | null;
            turmaId: string | null;
            matriculaPaga: boolean;
            fotoUrl: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        pagamentos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            mensalidadeId: string;
            valorPago: Prisma.Decimal;
            dataPagamento: Date;
            metodo: import(".prisma/client").$Enums.MetodoPagamento;
        }[];
    } & {
        status: import(".prisma/client").$Enums.MensalidadeStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        alunoId: string;
        valor: Prisma.Decimal;
        vencimento: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateMensalidadeDto): Promise<{
        status: import(".prisma/client").$Enums.MensalidadeStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        alunoId: string;
        valor: Prisma.Decimal;
        vencimento: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    gerarMensalidades(valorPadrao?: number): Promise<{
        message: string;
    }>;
}

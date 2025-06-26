import { MensalidadesService } from './mensalidades.service';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';
export declare class MensalidadesController {
    private readonly service;
    constructor(service: MensalidadesService);
    findAll(): Promise<({
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
            valorPago: import("@prisma/client/runtime/library").Decimal;
            dataPagamento: Date;
            metodo: import(".prisma/client").$Enums.MetodoPagamento;
        }[];
    } & {
        status: import(".prisma/client").$Enums.MensalidadeStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        alunoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        vencimento: Date;
    })[]>;
    findOne(id: string): Promise<({
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
            valorPago: import("@prisma/client/runtime/library").Decimal;
            dataPagamento: Date;
            metodo: import(".prisma/client").$Enums.MetodoPagamento;
        }[];
    } & {
        status: import(".prisma/client").$Enums.MensalidadeStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        alunoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        vencimento: Date;
    }) | null>;
    create(dto: CreateMensalidadeDto): Promise<{
        status: import(".prisma/client").$Enums.MensalidadeStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        alunoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        vencimento: Date;
    }>;
    gerarMensalidades(): Promise<{
        message: string;
    }>;
    update(id: string, dto: UpdateMensalidadeDto): Promise<{
        status: import(".prisma/client").$Enums.MensalidadeStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        alunoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        vencimento: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

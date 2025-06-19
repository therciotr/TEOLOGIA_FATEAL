import { PrismaService } from '@/prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { ConfigService } from '@nestjs/config';
export declare class DocumentosService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    private buildPublicUrl;
    private deletePhysicalFile;
    create(data: CreateDocumentoDto): Promise<{
        nome: string;
        url: string;
        id: string;
        criadoEm: Date;
        atualizadoEm: Date;
        alunoId: string;
    }>;
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
    } & {
        nome: string;
        url: string;
        id: string;
        criadoEm: Date;
        atualizadoEm: Date;
        alunoId: string;
    })[]>;
    findOne(id: string): Promise<{
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
    } & {
        nome: string;
        url: string;
        id: string;
        criadoEm: Date;
        atualizadoEm: Date;
        alunoId: string;
    }>;
    update(id: string, data: UpdateDocumentoDto): Promise<{
        nome: string;
        url: string;
        id: string;
        criadoEm: Date;
        atualizadoEm: Date;
        alunoId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    salvarDocumentos(alunoId: string, arquivos: Express.Multer.File[]): Promise<{
        nome: string;
        url: string;
        id: string;
        criadoEm: Date;
        atualizadoEm: Date;
        alunoId: string;
    }[]>;
}

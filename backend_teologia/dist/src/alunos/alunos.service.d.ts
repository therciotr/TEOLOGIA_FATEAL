import { PrismaService } from '@/prisma/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Firestore } from 'firebase-admin/firestore';
export declare class AlunosService {
    private readonly prisma;
    private readonly firestore;
    private readonly logger;
    constructor(prisma: PrismaService, firestore: Firestore);
    create(dto: CreateAlunoDto): Promise<{
        turma: {
            nome: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            planoId: string | null;
        } | null;
        documentos: {
            nome: string;
            url: string;
            id: string;
            criadoEm: Date;
            atualizadoEm: Date;
            alunoId: string;
        }[];
    } & {
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
    }>;
    findAll(): Promise<({
        turma: {
            nome: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            planoId: string | null;
        } | null;
        documentos: {
            nome: string;
            url: string;
            id: string;
            criadoEm: Date;
            atualizadoEm: Date;
            alunoId: string;
        }[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        turma: {
            nome: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            planoId: string | null;
        } | null;
        documentos: {
            nome: string;
            url: string;
            id: string;
            criadoEm: Date;
            atualizadoEm: Date;
            alunoId: string;
        }[];
    } & {
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
    }>;
    update(id: string, dto: UpdateAlunoDto): Promise<{
        turma: {
            nome: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            planoId: string | null;
        } | null;
        documentos: {
            nome: string;
            url: string;
            id: string;
            criadoEm: Date;
            atualizadoEm: Date;
            alunoId: string;
        }[];
    } & {
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

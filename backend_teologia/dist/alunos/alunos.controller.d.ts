import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
export declare class AlunosController {
    private readonly alunosService;
    constructor(alunosService: AlunosService);
    create(createAlunoDto: CreateAlunoDto, foto3x4: Express.Multer.File): Promise<{
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
    update(id: string, updateAlunoDto: UpdateAlunoDto, foto3x4?: Express.Multer.File): Promise<{
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

import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
export declare class DocumentosController {
    private readonly documentosService;
    constructor(documentosService: DocumentosService);
    create(dto: CreateDocumentoDto): Promise<{
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
    update(id: string, dto: UpdateDocumentoDto): Promise<{
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
    uploadDocumentos(alunoId: string, files: {
        documentos?: Express.Multer.File[];
    }): Promise<{
        nome: string;
        url: string;
        id: string;
        criadoEm: Date;
        atualizadoEm: Date;
        alunoId: string;
    }[]>;
}

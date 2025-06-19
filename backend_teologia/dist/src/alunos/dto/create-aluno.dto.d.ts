export declare class DocumentoDto {
    nome: string;
    url: string;
}
export declare class CreateAlunoDto {
    nome: string;
    email: string;
    telefone?: string;
    dataNascimento?: string;
    endereco?: string;
    rg?: string;
    cpf?: string;
    turmaId?: string;
    foto3x4?: any;
    documentos?: DocumentoDto[];
    matriculaPaga?: boolean;
    fotoUrl?: string;
}

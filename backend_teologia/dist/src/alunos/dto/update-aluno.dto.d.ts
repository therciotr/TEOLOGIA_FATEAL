import { CreateAlunoDto, DocumentoDto } from './create-aluno.dto';
declare const UpdateAlunoDto_base: import("@nestjs/common").Type<Partial<CreateAlunoDto>>;
export declare class UpdateAlunoDto extends UpdateAlunoDto_base {
    endereco?: string;
    rg?: string;
    cpf?: string;
    matriculaPaga?: boolean;
    foto3x4?: any;
    documentos?: DocumentoDto[];
    fotoUrl?: string;
}
export {};

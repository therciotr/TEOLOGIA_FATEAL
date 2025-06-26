import { CreateDocumentoDto } from './create-documento.dto';
declare const UpdateDocumentoDto_base: import("@nestjs/common").Type<Partial<CreateDocumentoDto>>;
export declare class UpdateDocumentoDto extends UpdateDocumentoDto_base {
    nome?: string;
    url?: string;
    alunoId?: string;
}
export {};

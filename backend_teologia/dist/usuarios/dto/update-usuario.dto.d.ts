import { CreateUsuarioDto } from './create-usuario.dto';
declare const UpdateUsuarioDto_base: import("@nestjs/common").Type<Partial<CreateUsuarioDto>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    nome?: string;
    email?: string;
    senha?: string;
    perfil?: string;
    ativo?: boolean;
}
export {};

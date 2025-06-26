import { CreateResponsavelDto } from './create-responsavel.dto';
declare const UpdateResponsavelDto_base: import("@nestjs/common").Type<Partial<CreateResponsavelDto>>;
export declare class UpdateResponsavelDto extends UpdateResponsavelDto_base {
    nome?: string;
    email?: string;
    telefone?: string;
}
export {};

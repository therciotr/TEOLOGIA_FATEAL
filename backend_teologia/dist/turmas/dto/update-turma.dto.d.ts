import { CreateTurmaDto } from './create-turma.dto';
declare const UpdateTurmaDto_base: import("@nestjs/common").Type<Partial<CreateTurmaDto>>;
export declare class UpdateTurmaDto extends UpdateTurmaDto_base {
    nome?: string;
    planoId?: string;
}
export {};

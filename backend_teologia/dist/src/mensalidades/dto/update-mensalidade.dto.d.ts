import { CreateMensalidadeDto } from './create-mensalidade.dto';
import { MensalidadeStatus } from '@prisma/client';
declare const UpdateMensalidadeDto_base: import("@nestjs/common").Type<Partial<CreateMensalidadeDto>>;
export declare class UpdateMensalidadeDto extends UpdateMensalidadeDto_base {
    valor?: number;
    vencimento?: string;
    status?: MensalidadeStatus;
}
export {};

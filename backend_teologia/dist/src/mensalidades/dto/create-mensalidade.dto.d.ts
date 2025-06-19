import { MensalidadeStatus } from '@prisma/client';
export declare class CreateMensalidadeDto {
    alunoId: string;
    valor: number;
    vencimento: string;
    status?: MensalidadeStatus;
}

import { PrismaService } from '@/prisma/prisma.service';
export declare class ComprovantesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    gerarComprovante(pagamentoId: string): Promise<NodeJS.ReadableStream>;
}

import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, Turma } from '@prisma/client';
export declare class TurmasService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(): Promise<Turma[]>;
    findOne(id: string): Promise<Turma>;
    create(data: Prisma.TurmaCreateInput): Promise<Turma>;
    update(id: string, data: Prisma.TurmaUpdateInput): Promise<Turma>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

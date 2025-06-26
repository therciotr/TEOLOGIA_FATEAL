import { PrismaService } from '@/prisma/prisma.service';
import { Plano, Prisma } from '@prisma/client';
export declare class PlanosService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(): Promise<Plano[]>;
    create(data: Prisma.PlanoCreateInput): Promise<Plano>;
    update(id: string, data: Prisma.PlanoUpdateInput): Promise<Plano>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

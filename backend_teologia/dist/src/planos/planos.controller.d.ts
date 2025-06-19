import { PlanosService } from './planos.service';
import { Prisma } from '@prisma/client';
export declare class PlanosController {
    private readonly planosService;
    constructor(planosService: PlanosService);
    findAll(): Promise<{
        nome: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        valorPadrao: Prisma.Decimal;
    }[]>;
    create(data: Prisma.PlanoCreateInput): Promise<{
        nome: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        valorPadrao: Prisma.Decimal;
    }>;
    update(id: string, data: Prisma.PlanoUpdateInput): Promise<{
        nome: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        valorPadrao: Prisma.Decimal;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

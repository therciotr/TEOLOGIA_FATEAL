import { PrismaService } from '@/prisma/prisma.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { Responsavel } from '@prisma/client';
export declare class ResponsaveisService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(data: CreateResponsavelDto): Promise<Responsavel>;
    findAll(): Promise<Responsavel[]>;
    findOne(id: string): Promise<Responsavel>;
    update(id: string, data: UpdateResponsavelDto): Promise<Responsavel>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

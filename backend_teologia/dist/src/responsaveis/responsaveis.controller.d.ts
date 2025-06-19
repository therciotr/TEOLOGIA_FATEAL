import { ResponsaveisService } from './responsaveis.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
export declare class ResponsaveisController {
    private readonly service;
    constructor(service: ResponsaveisService);
    create(dto: CreateResponsavelDto): Promise<{
        nome: string;
        email: string;
        telefone: string | null;
        cpf: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        nome: string;
        email: string;
        telefone: string | null;
        cpf: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        nome: string;
        email: string;
        telefone: string | null;
        cpf: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateResponsavelDto): Promise<{
        nome: string;
        email: string;
        telefone: string | null;
        cpf: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

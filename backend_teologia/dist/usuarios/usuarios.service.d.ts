import { PrismaService } from '@/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';
export declare class UsuariosService {
    private readonly prisma;
    private readonly logger;
    private readonly saltRounds;
    constructor(prisma: PrismaService);
    create(dto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: string): Promise<Usuario>;
    update(id: string, dto: UpdateUsuarioDto): Promise<Usuario>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

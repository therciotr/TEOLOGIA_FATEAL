import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly service;
    constructor(service: UsuariosService);
    create(dto: CreateUsuarioDto): Promise<{
        nome: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        senha: string;
        perfil: string;
        ativo: boolean;
    }>;
    findAll(): Promise<{
        nome: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        senha: string;
        perfil: string;
        ativo: boolean;
    }[]>;
    findOne(id: string): Promise<{
        nome: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        senha: string;
        perfil: string;
        ativo: boolean;
    }>;
    update(id: string, dto: UpdateUsuarioDto): Promise<{
        nome: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        senha: string;
        perfil: string;
        ativo: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

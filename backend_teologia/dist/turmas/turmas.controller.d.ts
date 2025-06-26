import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
export declare class TurmasController {
    private readonly turmasService;
    constructor(turmasService: TurmasService);
    findAll(): Promise<{
        nome: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        planoId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        nome: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        planoId: string | null;
    }>;
    create(createTurmaDto: CreateTurmaDto): Promise<{
        nome: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        planoId: string | null;
    }>;
    update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<{
        nome: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        planoId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

import { StreamableFile } from '@nestjs/common';
import { ComprovantesService } from './comprovantes.service';
import { Response } from 'express';
export declare class ComprovantesController {
    private readonly comprovantesService;
    constructor(comprovantesService: ComprovantesService);
    gerarComprovante(id: string, res: Response): Promise<StreamableFile>;
}

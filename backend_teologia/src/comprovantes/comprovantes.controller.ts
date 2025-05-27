import { Controller, Get, Param, Res } from '@nestjs/common';
import { ComprovantesService } from './comprovantes.service';
import { Response } from 'express';

@Controller('comprovantes')
export class ComprovantesController {
  constructor(private readonly comprovantesService: ComprovantesService) {}

  @Get(':id')
  gerarComprovante(@Param('id') id: string, @Res() res: Response) {
    return this.comprovantesService.gerarComprovante(id, res);
  }
}
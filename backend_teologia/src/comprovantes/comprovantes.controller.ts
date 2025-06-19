// src/comprovantes/comprovantes.controller.ts
import {
  Controller,
  Get,
  Param,
  Res,
  StreamableFile,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ComprovantesService } from './comprovantes.service';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('comprovantes')
export class ComprovantesController {
  constructor(private readonly comprovantesService: ComprovantesService) {}

  @Get(':id')
  async gerarComprovante(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    try {
      const pdfStream = await this.comprovantesService.gerarComprovante(id);

      if (!(pdfStream instanceof Readable)) {
        throw new InternalServerErrorException('Stream inválido.');
      }

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=comprovante-${id}.pdf`,
      });

      return new StreamableFile(pdfStream);
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Falha ao gerar comprovante.');
    }
  }
}
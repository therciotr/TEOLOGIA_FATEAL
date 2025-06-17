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

@Controller('comprovantes')
export class ComprovantesController {
  constructor(private readonly comprovantesService: ComprovantesService) {}

  /**
   * Gera e devolve o comprovante em PDF.
   */
  @Get(':id')
  async gerarComprovante(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    try {
      const pdfStream = await this.comprovantesService.gerarComprovante(id);

      // Cabeçalhos HTTP
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=comprovante-${id}.pdf`,
      });

      // Retorna o stream como StreamableFile (Nest cuida do pipe/end)
      return new StreamableFile(pdfStream);
    } catch (err) {
      // Erro propagado do service (pagamento não encontrado)
      if (err instanceof NotFoundException) throw err;

      // Outros erros (ex.: falha ao gerar PDF)
      throw new InternalServerErrorException(
        'Falha ao gerar comprovante. Tente novamente.',
      );
    }
  }
}
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ComprovantesService } from './comprovantes.service';
import { Response } from 'express';

@Controller('comprovantes')
export class ComprovantesController {
  constructor(private readonly comprovantesService: ComprovantesService) {}

  @Get(':id')
  async gerarComprovante(@Param('id') id: string, @Res() res: Response) {
    const comprovante = await this.comprovantesService.gerarComprovante(id);

    // Exemplo de envio de PDF fictício (ajuste para gerar real):
    res.setHeader('Content-Type', 'application/pdf');
    res.send('Comprovante gerado em PDF!');
  }
}
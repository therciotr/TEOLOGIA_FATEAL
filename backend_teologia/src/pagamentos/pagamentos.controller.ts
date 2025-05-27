import { Controller, Post, Param, Get, Res } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { Response } from 'express';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post(':id/pagar')
  pagar(@Param('id') id: string) {
    return this.pagamentosService.pagar(id);
  }

  @Get(':id/comprovante')
  gerarComprovante(@Param('id') id: string, @Res() res: Response) {
    return this.pagamentosService.gerarComprovante(id, res);
  }
}
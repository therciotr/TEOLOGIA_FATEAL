import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { Response } from 'express';

/**
 * Controller de Pagamentos
 * Combina pagamento por banco dinâmico e pagamento geral por ID,
 * além de gerar comprovantes em PDF.
 */
@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  /**
   * Endpoint dinâmico para pagar em um banco específico (ex: banco_do_brasil, mercado_pago)
   * Exemplo: POST /pagamentos/banco_do_brasil
   */
  @Post(':banco')
  async pagarBanco(
    @Param('banco') banco: string,
    @Body() dadosPagamento: any,
  ) {
    if (!banco) {
      throw new HttpException(
        'Banco não especificado',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.pagamentosService.pagarBanco(banco, dadosPagamento);
  }

  /**
   * Endpoint para pagar um pagamento geral por ID (ex: mensalidade, etc).
   * Exemplo: POST /pagamentos/:id/pagar
   */
  @Post(':id/pagar')
  async pagar(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }

    return this.pagamentosService.pagar(id);
  }

  /**
   * Endpoint para gerar e retornar um comprovante em PDF.
   * Exemplo: GET /pagamentos/:id/comprovante
   */
  @Get(':id/comprovante')
  async gerarComprovante(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }

    return this.pagamentosService.gerarComprovante(id, res);
  }
}
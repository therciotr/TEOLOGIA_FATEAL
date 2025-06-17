import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { Response } from 'express';

@ApiTags('Pagamentos')
@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  // ─────────────────────────────────────────────────────────
  // POST /api/pagamentos/{banco}
  // Ex.: banco = 'bb', 'asaas', 'mercado_pago'
  // ─────────────────────────────────────────────────────────
  @Post(':banco')
  @ApiOperation({ summary: 'Efetuar pagamento em banco específico' })
  @ApiParam({ name: 'banco', example: 'bb' })
  @ApiBody({ type: CreatePagamentoDto })
  async pagarBanco(
    @Param('banco') banco: string,
    @Body() dadosPagamento: CreatePagamentoDto,
  ) {
    if (!banco) {
      throw new HttpException('Banco não especificado', HttpStatus.BAD_REQUEST);
    }
    return this.pagamentosService.pagarBanco(banco, dadosPagamento);
  }

  // ─────────────────────────────────────────────────────────
  // POST /api/pagamentos/{id}/pagar
  // Efetua pagamento da mensalidade vinculada
  // ─────────────────────────────────────────────────────────
  @Post(':id/pagar')
  @ApiOperation({ summary: 'Quitar pagamento/mensalidade por ID' })
  @ApiParam({ name: 'id', example: 'uuid-mensalidade' })
  async pagar(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }
    return this.pagamentosService.pagar(id);
  }

  // ─────────────────────────────────────────────────────────
  // GET /api/pagamentos/{id}/comprovante
  // Gera PDF (mock) de comprovante
  // ─────────────────────────────────────────────────────────
  @Get(':id/comprovante')
  @ApiOperation({ summary: 'Gerar comprovante em PDF' })
  @ApiParam({ name: 'id', example: 'uuid-pagamento' })
  async gerarComprovante(@Param('id') id: string, @Res() res: Response) {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }

    // PagamentosService já ajusta headers; aqui só retorna a stream
    await this.pagamentosService.gerarComprovante(id, res);
    // evita “UnhandledPromise” e garante status 200
    return res.status(HttpStatus.OK);
  }
}
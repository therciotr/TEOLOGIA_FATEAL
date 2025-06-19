// src/pagamentos/pagamentos.controller.ts
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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';

import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';

@ApiTags('Pagamentos')
@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly service: PagamentosService) {}

  /* ───────────── PSP / Bancos externos ───────────── */
  @Post('banco/:banco')
  @ApiOperation({ summary: 'Gerar cobrança via PSP/Banco' })
  @ApiParam({ name: 'banco', example: 'bb', description: 'Identificador do banco/PSP' })
  @ApiBody({ type: CreatePagamentoDto })
  async pagarBanco(
    @Param('banco') banco: string,
    @Body() dto: CreatePagamentoDto,
  ) {
    if (!banco) {
      throw new HttpException('Banco não especificado', HttpStatus.BAD_REQUEST);
    }
    return this.service.pagarBanco(banco, dto);
  }

  /* ───────────── CRUD direto de pagamento ───────────── */
  @Post()
  @ApiOperation({ summary: 'Registrar pagamento manual (sem PSP)' })
  @ApiBody({ type: CreatePagamentoDto })
  async create(@Body() dto: CreatePagamentoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pagamentos' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhar pagamento por ID' })
  @ApiParam({ name: 'id', example: 'uuid-pagamento' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /* ───────────── Quitar mensalidade associada ───────────── */
  @Post('mensalidade/:mensalidadeId/quitar')
  @ApiOperation({ summary: 'Marcar mensalidade como paga' })
  @ApiParam({ name: 'mensalidadeId', example: 'uuid-mensalidade' })
  async quitarMensalidade(@Param('mensalidadeId') mensalidadeId: string) {
    if (!mensalidadeId) {
      throw new HttpException('ID de mensalidade não informado', HttpStatus.BAD_REQUEST);
    }
    return this.service.quitarMensalidade(mensalidadeId);
  }

  /* ───────────── Comprovante (mock) ───────────── */
  @Get(':id/comprovante')
  @ApiOperation({ summary: 'Gerar comprovante em PDF (mock)' })
  @ApiParam({ name: 'id', example: 'uuid-pagamento' })
  async gerarComprovante(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }
    const payload = await this.service.gerarComprovanteMock(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.status(HttpStatus.OK).send(payload);
  }
}
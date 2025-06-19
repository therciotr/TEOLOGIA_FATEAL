// src/mensalidades/mensalidades.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

import { MensalidadesService } from './mensalidades.service';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';

@ApiTags('Mensalidades')
@Controller('mensalidades')
export class MensalidadesController {
  constructor(private readonly service: MensalidadesService) {}

  /* ─────────────── READ ─────────────── */

  /** 🔹 Lista todas as mensalidades */
  @Get()
  @ApiOperation({ summary: 'Listar todas as mensalidades' })
  async findAll() {
    return this.service.findAll();
  }

  /** 🔹 Busca uma mensalidade pelo ID */
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID da mensalidade' })
  @ApiOperation({ summary: 'Buscar uma mensalidade específica' })
  async findOne(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        'ID da mensalidade não informado',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.service.findOne(id);
  }

  /* ─────────────── CREATE ─────────────── */

  /** 🔹 Cria uma nova mensalidade */
  @Post()
  @ApiOperation({ summary: 'Criar nova mensalidade' })
  async create(@Body() dto: CreateMensalidadeDto) {
    return this.service.create(dto);
  }

  /** 🔹 Gera mensalidades em massa (mês corrente) */
  @Post('/gerar')
  @ApiOperation({
    summary: 'Gerar mensalidades em massa para o mês atual',
    description:
      'Cria automaticamente mensalidades pendentes para todos os alunos que ainda não possuem uma no mês corrente.',
  })
  async gerarMensalidades() {
    return this.service.gerarMensalidades();
  }

  /* ─────────────── UPDATE ─────────────── */

  /** 🔹 Atualiza uma mensalidade existente */
  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID da mensalidade' })
  @ApiOperation({ summary: 'Atualizar mensalidade' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMensalidadeDto,
  ) {
    if (!id) {
      throw new HttpException(
        'ID da mensalidade não informado',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.service.update(id, dto);
  }

  /* ─────────────── DELETE ─────────────── */

  /** 🔹 Remove uma mensalidade */
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID da mensalidade' })
  @ApiOperation({ summary: 'Remover mensalidade' })
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        'ID da mensalidade não informado',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.service.remove(id);
  }
}
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
import { MensalidadesService } from './mensalidades.service';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';

/**
 * Controller de Mensalidades
 * Gerencia mensalidades de alunos: criação, listagem, atualização e geração em massa.
 */
@Controller('mensalidades')
export class MensalidadesController {
  constructor(private readonly mensalidadesService: MensalidadesService) {}

  /** 🔹 Lista todas as mensalidades */
  @Get()
  async findAll() {
    return this.mensalidadesService.findAll();
  }

  /** 🔹 Busca uma mensalidade pelo ID */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('ID da mensalidade não informado', HttpStatus.BAD_REQUEST);
    }
    return this.mensalidadesService.findOne(id);
  }

  /** 🔹 Cria uma nova mensalidade */
  @Post()
  async create(@Body() data: CreateMensalidadeDto) {
    return this.mensalidadesService.create(data);
  }

  /** 🔹 Gera mensalidades em massa (ex: por turma ou por plano) */
  @Post('/gerar')
  async gerarMensalidades() {
    return this.mensalidadesService.gerarMensalidades();
  }

  /** 🔹 Atualiza uma mensalidade existente */
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateMensalidadeDto) {
    if (!id) {
      throw new HttpException('ID da mensalidade não informado', HttpStatus.BAD_REQUEST);
    }
    return this.mensalidadesService.update(id, data);
  }

  /** 🔹 Remove uma mensalidade */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('ID da mensalidade não informado', HttpStatus.BAD_REQUEST);
    }
    return this.mensalidadesService.remove(id);
  }
}
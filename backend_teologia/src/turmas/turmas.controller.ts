// src/turmas/turmas.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Turmas')
@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as turmas' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.' })
  findAll() {
    return this.turmasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma turma por ID' })
  @ApiResponse({ status: 200, description: 'Turma encontrada.' })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.turmasService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova turma' })
  @ApiResponse({ status: 201, description: 'Turma criada com sucesso.' })
  create(@Body() createTurmaDto: CreateTurmaDto) {
    return this.turmasService.create(createTurmaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma turma' })
  @ApiResponse({ status: 200, description: 'Turma atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  update(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmasService.update(id, updateTurmaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma turma por ID' })
  @ApiResponse({ status: 200, description: 'Turma removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.turmasService.remove(id);
  }
}
// src/turmas/turmas.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Turmas')
@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as turmas' })
  findAll() {
    return this.turmasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma turma por ID' })
  findOne(@Param('id') id: string) {
    return this.turmasService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova turma' })
  create(@Body() createTurmaDto: CreateTurmaDto) {
    return this.turmasService.create(createTurmaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma turma' })
  update(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmasService.update(id, updateTurmaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma turma por ID' })
  remove(@Param('id') id: string) {
    return this.turmasService.remove(id);
  }
}
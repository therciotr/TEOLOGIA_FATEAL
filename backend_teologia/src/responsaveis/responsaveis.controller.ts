// src/responsaveis/responsaveis.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { ResponsaveisService } from './responsaveis.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';

@ApiTags('Responsáveis')
@Controller('responsaveis')
export class ResponsaveisController {
  constructor(private readonly service: ResponsaveisService) {}

  /* ───────────── CREATE ───────────── */
  @Post()
  @ApiOperation({ summary: 'Criar um novo responsável' })
  @ApiCreatedResponse({ description: 'Responsável criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  create(@Body() dto: CreateResponsavelDto) {
    return this.service.create(dto);
  }

  /* ───────────── READ ───────────── */
  @Get()
  @ApiOperation({ summary: 'Listar todos os responsáveis' })
  @ApiOkResponse({ description: 'Lista recuperada com sucesso' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar responsável por ID' })
  @ApiParam({ name: 'id', description: 'ID do responsável' })
  @ApiOkResponse({ description: 'Responsável encontrado' })
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }
    return this.service.findOne(id);
  }

  /* ───────────── UPDATE ───────────── */
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um responsável' })
  @ApiParam({ name: 'id', description: 'ID do responsável a atualizar' })
  @ApiOkResponse({ description: 'Responsável atualizado com sucesso' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateResponsavelDto,
  ) {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }
    return this.service.update(id, dto);
  }

  /* ───────────── DELETE ───────────── */
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um responsável' })
  @ApiParam({ name: 'id', description: 'ID do responsável a remover' })
  @ApiNoContentResponse({ description: 'Responsável removido com sucesso' })
  remove(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }
    return this.service.remove(id);
  }
}
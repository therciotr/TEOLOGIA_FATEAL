// src/planos/planos.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PlanosService } from './planos.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Planos')
@Controller('planos')
export class PlanosController {
  constructor(private readonly planosService: PlanosService) {}

  /** 🔹 Lista todos os planos existentes */
  @Get()
  @ApiOperation({ summary: 'Listar todos os planos financeiros' })
  findAll() {
    return this.planosService.findAll();
  }

  /** 🔹 Cria um novo plano */
  @Post()
  @ApiOperation({ summary: 'Criar um novo plano financeiro' })
  @ApiBody({ type: Object }) // Substituir futuramente por DTO se necessário
  create(@Body() data: Prisma.PlanoCreateInput) {
    if (!data?.nome || !data?.valorPadrao) {
      throw new HttpException(
        'Campos obrigatórios não preenchidos (ex: nome, valorPadrao)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.planosService.create(data);
  }

  /** 🔹 Atualiza um plano existente */
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um plano pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do plano a ser atualizado' })
  update(@Param('id') id: string, @Body() data: Prisma.PlanoUpdateInput) {
    return this.planosService.update(id, data);
  }

  /** 🔹 Remove um plano */
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um plano pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do plano a ser removido' })
  remove(@Param('id') id: string) {
    return this.planosService.remove(id);
  }
}
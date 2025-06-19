// src/usuarios/usuarios.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  /* ───────────── CREATE ───────────── */
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou e-mail duplicado.' })
  create(@Body() dto: CreateUsuarioDto) {
    return this.service.create(dto);
  }

  /* ───────────── READ ───────────── */
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiOkResponse({ description: 'Lista de usuários retornada com sucesso.' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID (UUID) do usuário' })
  @ApiOkResponse({ description: 'Usuário encontrado.' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  /* ───────────── UPDATE ───────────── */
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID (UUID) do usuário' })
  @ApiOkResponse({ description: 'Usuário atualizado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou e-mail já em uso.' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUsuarioDto,
  ) {
    return this.service.update(id, dto);
  }

  /* ───────────── DELETE ───────────── */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID (UUID) do usuário' })
  @ApiNoContentResponse({ description: 'Usuário removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
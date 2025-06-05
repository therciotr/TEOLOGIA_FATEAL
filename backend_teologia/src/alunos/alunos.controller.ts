// src/alunos/alunos.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

/**
 * Controller responsável por gerenciar rotas relacionadas a "Alunos".
 * Inclui criação, listagem, atualização e remoção.
 */
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  /**
   * Criação de um novo aluno.
   * Suporta upload de foto 3x4.
   * Também aceita status de matrícula (matriculaPaga) e documentos.
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('foto3x4', {
      storage: diskStorage({
        destination: './uploads/fotos', // Pasta onde as fotos são salvas
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createAlunoDto: CreateAlunoDto,
    @UploadedFile() foto3x4: Express.Multer.File,
  ) {
    // Se houver upload de foto, salva a URL no DTO
    if (foto3x4) {
      createAlunoDto.fotoUrl = `/uploads/fotos/${foto3x4.filename}`;
    }

    // Cria o aluno no banco de dados
    return this.alunosService.create(createAlunoDto);
  }

  /**
   * Retorna todos os alunos cadastrados.
   */
  @Get()
  async findAll() {
    return this.alunosService.findAll();
  }

  /**
   * Retorna os detalhes de um aluno específico.
   * @param id - UUID do aluno
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.alunosService.findOne(id);
  }

  /**
   * Atualiza as informações de um aluno.
   * Suporta upload de nova foto 3x4 e status de matrícula.
   * @param id - UUID do aluno
   */
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('foto3x4', {
      storage: diskStorage({
        destination: './uploads/fotos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
    @UploadedFile() foto3x4?: Express.Multer.File,
  ) {
    // Se houver upload de nova foto, atualiza a URL no DTO
    if (foto3x4) {
      updateAlunoDto.fotoUrl = `/uploads/fotos/${foto3x4.filename}`;
    }

    // Atualiza o aluno no banco de dados
    return this.alunosService.update(id, updateAlunoDto);
  }

  /**
   * Remove um aluno do banco de dados.
   * @param id - UUID do aluno
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.alunosService.remove(id);
  }
}
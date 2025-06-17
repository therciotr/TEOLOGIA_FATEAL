// src/documentos/documentos.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Documentos')
@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  /* ───────────── CRUD manual ───────────── */
  @Post()
  @ApiOperation({ summary: 'Criar documento manualmente' })
  create(@Body() dto: CreateDocumentoDto) {
    return this.documentosService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os documentos' })
  findAll() {
    return this.documentosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar documento por ID' })
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar documento' })
  update(@Param('id') id: string, @Body() dto: UpdateDocumentoDto) {
    return this.documentosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover documento' })
  remove(@Param('id') id: string) {
    return this.documentosService.remove(id);
  }

  /* ───────────── Upload múltiplo ───────────── */
  @Post('upload/:alunoId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'documentos', maxCount: 10 }],
      {
        storage: diskStorage({
          destination: './uploads/documentos',
          filename: (req, file, cb) => {
            const uniq = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `doc-${uniq}${extname(file.originalname)}`);
          },
        }),
        /** 1️⃣  Filtro de tipos permitidos */
        fileFilter: (req, file, cb) => {
          const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
          if (!allowed.includes(file.mimetype)) {
            return cb(
              new BadRequestException(
                'Tipo de arquivo inválido. Aceito: PDF, JPG ou PNG.',
              ),
              false,
            );
          }
          cb(null, true);
        },
        /** 2️⃣  Limite de tamanho: 5 MB por arquivo */
        limits: { fileSize: 5 * 1024 * 1024 },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload de múltiplos documentos para um aluno',
    description:
      'Aceita até 10 arquivos (PDF, JPG, PNG) de no máximo 5 MB cada.',
  })
  async uploadDocumentos(
    @Param('alunoId') alunoId: string,
    @UploadedFiles() files: { documentos?: Express.Multer.File[] },
  ) {
    if (!files?.documentos || files.documentos.length === 0) {
      throw new BadRequestException('Nenhum documento enviado.');
    }
    /* 3️⃣  Service valida se o aluno existe e grava */
    return this.documentosService.salvarDocumentos(alunoId, files.documentos);
  }
}
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

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  /**
   * Cria um novo documento.
   */
  @Post()
  create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentosService.create(createDocumentoDto);
  }

  /**
   * Lista todos os documentos.
   */
  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  /**
   * Busca um documento pelo ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(id);
  }

  /**
   * Atualiza um documento.
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentoDto: UpdateDocumentoDto,
  ) {
    return this.documentosService.update(id, updateDocumentoDto);
  }

  /**
   * Remove um documento.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(id);
  }

  /**
   * Upload de múltiplos documentos para um aluno.
   */
  @Post('upload/:alunoId')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'documentos', maxCount: 10 }], {
      storage: diskStorage({
        destination: './uploads/documentos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadDocumentos(
    @Param('alunoId') alunoId: string,
    @UploadedFiles() files: { documentos?: Express.Multer.File[] },
  ) {
    if (!files.documentos || files.documentos.length === 0) {
      throw new BadRequestException('Nenhum documento enviado.');
    }
    return this.documentosService.salvarDocumentos(alunoId, files.documentos);
  }
}
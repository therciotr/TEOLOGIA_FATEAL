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
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Alunos')
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  /**
   * 📌 Criação de aluno (com upload de foto)
   */
  @Post()
  @ApiOperation({ summary: 'Criar aluno com upload de foto 3x4' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('foto3x4', {
      storage: diskStorage({
        destination: './uploads/fotos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `foto-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createAlunoDto: CreateAlunoDto,
    @UploadedFile() foto3x4: Express.Multer.File,
  ) {
    if (foto3x4) {
      createAlunoDto.fotoUrl = `/uploads/fotos/${foto3x4.filename}`;
    }
    return this.alunosService.create(createAlunoDto);
  }

  /**
   * 📌 Listagem de alunos
   */
  @Get()
  @ApiOperation({ summary: 'Listar todos os alunos' })
  async findAll() {
    return this.alunosService.findAll();
  }

  /**
   * 📌 Detalhar aluno
   */
  @Get(':id')
  @ApiOperation({ summary: 'Buscar aluno por ID' })
  async findOne(@Param('id') id: string) {
    return this.alunosService.findOne(id);
  }

  /**
   * 📌 Atualizar aluno (com nova foto opcional)
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do aluno' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('foto3x4', {
      storage: diskStorage({
        destination: './uploads/fotos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `foto-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
    @UploadedFile() foto3x4?: Express.Multer.File,
  ) {
    if (foto3x4) {
      updateAlunoDto.fotoUrl = `/uploads/fotos/${foto3x4.filename}`;
    }
    return this.alunosService.update(id, updateAlunoDto);
  }

  /**
   * 📌 Remover aluno
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Remover aluno' })
  async remove(@Param('id') id: string) {
    return this.alunosService.remove(id);
  }
}
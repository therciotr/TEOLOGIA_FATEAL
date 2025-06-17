// src/alunos/uploads/documentos/documentos.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { join } from 'path';

@Injectable()
export class DocumentosService {
  constructor(private readonly prisma: PrismaService) {}

  /* ───────────── CRUD manual ───────────── */
  async create(data: CreateDocumentoDto) {
    return this.prisma.documento.create({ data });
  }

  async findAll() {
    return this.prisma.documento.findMany({ include: { aluno: true } });
  }

  async findOne(id: string) {
    return this.prisma.documento.findUnique({
      where: { id },
      include: { aluno: true },
    });
  }

  async update(id: string, data: UpdateDocumentoDto) {
    return this.prisma.documento.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.documento.delete({ where: { id } });
    return { message: `Documento com ID ${id} removido com sucesso!` };
  }

  /* ───────────── Upload múltiplo ───────────── */
  async salvarDocumentos(
    alunoId: string,
    arquivos: Express.Multer.File[],
  ) {
    /* 1️⃣  Confirma que o aluno existe */
    const aluno = await this.prisma.aluno.findUnique({ where: { id: alunoId } });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado para upload.');
    }

    /* 2️⃣  Persiste cada documento */
    const documentosCriados = await Promise.all(
      arquivos.map((file) =>
        this.prisma.documento.create({
          data: {
            nome: file.originalname,
            // Constrói URL pública; ajuste conforme seu domínio/Nginx
            url: join('/uploads/documentos', file.filename),
            alunoId,
          },
        }),
      ),
    );

    return documentosCriados;
  }
}
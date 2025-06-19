// src/alunos/uploads/documentos/documentos.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { join, posix as pathPosix } from 'path';
import { promises as fs } from 'fs';
import { ConfigService } from '@nestjs/config';
import { DOCUMENTOS_UPLOAD_DIR } from '@/config/constants';

@Injectable()
export class DocumentosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  /* ───────────── Helpers ───────────── */
  /** Constrói a URL pública de um arquivo salvo */
  private buildPublicUrl(filename: string): string {
    const base =
      this.config.get<string>('UPLOADS_BASE_URL') ?? '/uploads/documentos';
    // pathPosix garante '/' mesmo no Windows
    return pathPosix.join(base, filename);
  }

  /** Remove arquivo físico, ignorando caso já não exista */
  private async deletePhysicalFile(filePath: string) {
    try {
      await fs.unlink(filePath);
    } catch {
      /* silencioso: arquivo pode já ter sido excluído */
    }
  }

  /* ───────────── CRUD manual ───────────── */
  async create(data: CreateDocumentoDto) {
    return this.prisma.documento.create({ data });
  }

  async findAll() {
    return this.prisma.documento.findMany({ include: { aluno: true } });
  }

  async findOne(id: string) {
    const doc = await this.prisma.documento.findUnique({
      where: { id },
      include: { aluno: true },
    });
    if (!doc) {
      throw new NotFoundException('Documento não encontrado');
    }
    return doc;
  }

  async update(id: string, data: UpdateDocumentoDto) {
    await this.findOne(id); // lança 404 se não existe
    return this.prisma.documento.update({ where: { id }, data });
  }

  async remove(id: string) {
    const doc = await this.findOne(id);

    // Apaga registro no banco
    await this.prisma.documento.delete({ where: { id } });

    // Apaga arquivo físico
    const uploadDir =
      this.config.get<string>('UPLOADS_DIRECTORY') ?? DOCUMENTOS_UPLOAD_DIR;
    const filePath = join(uploadDir, pathPosix.basename(doc.url));
    await this.deletePhysicalFile(filePath);

    return { message: `Documento ${id} removido com sucesso!` };
  }

  /* ───────────── Upload múltiplo ───────────── */
  async salvarDocumentos(alunoId: string, arquivos: Express.Multer.File[]) {
    if (!arquivos.length) {
      throw new BadRequestException('Nenhum arquivo enviado para upload.');
    }

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
            url: this.buildPublicUrl(file.filename),
            alunoId,
          },
        }),
      ),
    );

    return documentosCriados;
  }
}
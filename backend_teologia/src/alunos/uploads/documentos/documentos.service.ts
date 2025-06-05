import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Injectable()
export class DocumentosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria um novo documento.
   */
  async create(data: CreateDocumentoDto) {
    return this.prisma.documento.create({
      data,
    });
  }

  /**
   * Lista todos os documentos.
   */
  async findAll() {
    return this.prisma.documento.findMany({
      include: { aluno: true },
    });
  }

  /**
   * Busca um documento por ID.
   */
  async findOne(id: string) {
    return this.prisma.documento.findUnique({
      where: { id },
      include: { aluno: true },
    });
  }

  /**
   * Atualiza um documento.
   */
  async update(id: string, data: UpdateDocumentoDto) {
    return this.prisma.documento.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove um documento.
   */
  async remove(id: string) {
    return this.prisma.documento.delete({
      where: { id },
    });
  }

  /**
   * Salva múltiplos documentos (usado no upload de vários arquivos).
   */
  async salvarDocumentos(alunoId: string, documentos: Express.Multer.File[]) {
    const documentosCriados = [];

    for (const doc of documentos) {
      const documento = await this.prisma.documento.create({
        data: {
          nome: doc.originalname,
          url: doc.path,
          alunoId,
        },
      });

      documentosCriados.push(documento);
    }

    return documentosCriados;
  }
}
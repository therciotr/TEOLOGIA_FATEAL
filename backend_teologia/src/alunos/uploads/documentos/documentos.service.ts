// src/alunos/uploads/documentos/documentos.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service'; // ✅ Usando alias @
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

/**
 * 📦 DocumentosService
 * Serviço responsável pela lógica de negócios de documentos dos alunos.
 */
@Injectable()
export class DocumentosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🔹 Cria um novo documento.
   */
  async create(data: CreateDocumentoDto) {
    return this.prisma.documento.create({ data });
  }

  /**
   * 🔹 Lista todos os documentos com os dados do aluno associado.
   */
  async findAll() {
    return this.prisma.documento.findMany({
      include: { aluno: true },
    });
  }

  /**
   * 🔹 Busca um documento específico por ID.
   */
  async findOne(id: string) {
    return this.prisma.documento.findUnique({
      where: { id },
      include: { aluno: true },
    });
  }

  /**
   * 🔹 Atualiza um documento existente.
   */
  async update(id: string, data: UpdateDocumentoDto) {
    return this.prisma.documento.update({
      where: { id },
      data,
    });
  }

  /**
   * 🔹 Remove um documento existente.
   */
  async remove(id: string) {
    await this.prisma.documento.delete({
      where: { id },
    });
    return { message: `Documento com ID ${id} removido com sucesso!` };
  }

  /**
   * 🔹 Salva múltiplos documentos (usado no upload múltiplo).
   */
  async salvarDocumentos(alunoId: string, documentos: Express.Multer.File[]) {
    const documentosCriados = await Promise.all(
      documentos.map((doc) =>
        this.prisma.documento.create({
          data: {
            nome: doc.originalname,
            url: doc.path,
            alunoId,
          },
        }),
      ),
    );

    return documentosCriados;
  }
}
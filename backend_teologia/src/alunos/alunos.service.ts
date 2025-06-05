// src/alunos/alunos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

/**
 * Serviço responsável pela lógica de negócios relacionada a "Alunos".
 * Usa o PrismaService para interagir com o banco de dados.
 */
@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria um novo aluno no banco de dados.
   * Também lida com o relacionamento de documentos, se fornecido.
   * @param data - Dados do aluno (CreateAlunoDto)
   */
  async create(data: CreateAlunoDto) {
    return this.prisma.aluno.create({
      data: {
        ...data,
        documentos: {
          // Cria os documentos associados ao aluno (caso existam)
          create: data.documentos?.map((doc) => ({
            nome: doc.nome,
            url: doc.url,
          })) || [],
        },
      },
    });
  }

  /**
   * Retorna todos os alunos cadastrados, incluindo:
   * - Documentos associados
   * - Informações da turma vinculada
   */
  async findAll() {
    return this.prisma.aluno.findMany({
      include: {
        documentos: true,
        turma: true,
      },
    });
  }

  /**
   * Busca um aluno específico pelo ID.
   * Lança exceção se o aluno não existir.
   * @param id - UUID do aluno
   */
  async findOne(id: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
      include: {
        documentos: true,
        turma: true,
      },
    });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
    return aluno;
  }

  /**
   * Atualiza as informações de um aluno.
   * Se houver documentos, remove todos os existentes e cria os novos.
   * @param id - UUID do aluno
   * @param data - Dados atualizados (UpdateAlunoDto)
   */
  async update(id: string, data: UpdateAlunoDto) {
    return this.prisma.aluno.update({
      where: { id },
      data: {
        ...data,
        documentos: data.documentos
          ? {
              deleteMany: {}, // Remove todos os documentos anteriores
              create: data.documentos.map((doc) => ({
                nome: doc.nome,
                url: doc.url,
              })),
            }
          : undefined, // Se não enviar documentos, mantém os existentes
      },
    });
  }

  /**
   * Remove um aluno do banco de dados pelo ID.
   * @param id - UUID do aluno
   */
  async remove(id: string) {
    await this.prisma.aluno.delete({
      where: { id },
    });
    return { message: `Aluno com ID ${id} removido!` };
  }
}
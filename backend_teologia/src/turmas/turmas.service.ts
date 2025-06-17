// src/turmas/turmas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service'; // Usa PrismaService injetado
import { Prisma } from '@prisma/client';

@Injectable()
export class TurmasService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista todas as turmas com seus planos associados.
   */
  async findAll() {
    return this.prisma.turma.findMany({
      include: {
        plano: true,
      },
    });
  }

  /**
   * Retorna uma turma específica com plano associado.
   * @param id ID da turma
   */
  async findOne(id: string) {
    const turma = await this.prisma.turma.findUnique({
      where: { id },
      include: {
        plano: true,
      },
    });

    if (!turma) {
      throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    }

    return turma;
  }

  /**
   * Cria uma nova turma.
   * @param data Dados da nova turma
   */
  async create(data: Prisma.TurmaCreateInput) {
    return this.prisma.turma.create({ data });
  }

  /**
   * Atualiza os dados de uma turma.
   * @param id ID da turma
   * @param data Dados atualizados
   */
  async update(id: string, data: Prisma.TurmaUpdateInput) {
    await this.findOne(id); // Confirma existência antes de atualizar
    return this.prisma.turma.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove uma turma pelo ID.
   * @param id ID da turma
   */
  async remove(id: string) {
    await this.findOne(id); // Confirma existência antes de deletar
    return this.prisma.turma.delete({
      where: { id },
    });
  }
}
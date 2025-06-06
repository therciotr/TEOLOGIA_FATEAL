// src/mensalidades/mensalidades.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service'; // ✅ Usando alias @ para padronização
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';

/**
 * 📦 MensalidadesService
 * Serviço que gerencia as mensalidades dos alunos.
 */
@Injectable()
export class MensalidadesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria uma nova mensalidade.
   */
  async create(data: CreateMensalidadeDto) {
    return this.prisma.mensalidade.create({ data });
  }

  /**
   * Retorna todas as mensalidades, incluindo o aluno associado.
   */
  async findAll() {
    return this.prisma.mensalidade.findMany({
      include: { aluno: true },
    });
  }

  /**
   * Retorna uma mensalidade específica por ID, incluindo o aluno.
   */
  async findOne(id: string) {
    return this.prisma.mensalidade.findUnique({
      where: { id },
      include: { aluno: true },
    });
  }

  /**
   * Atualiza uma mensalidade específica.
   */
  async update(id: string, data: UpdateMensalidadeDto) {
    return this.prisma.mensalidade.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove uma mensalidade específica.
   */
  async remove(id: string) {
    return this.prisma.mensalidade.delete({
      where: { id },
    });
  }

  /**
   * Gera mensalidades pendentes para todos os alunos.
   */
  async gerarMensalidades() {
    const alunos = await this.prisma.aluno.findMany();

    for (const aluno of alunos) {
      await this.prisma.mensalidade.create({
        data: {
          alunoId: aluno.id,
          valor: 100.0, // 💰 Valor fixo ou variável
          vencimento: new Date(), // 📅 Data atual (ajuste para data correta!)
          status: 'pendente',
        },
      });
    }

    return { message: 'Mensalidades geradas com sucesso!' };
  }
}
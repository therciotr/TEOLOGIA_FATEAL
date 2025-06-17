// src/planos/planos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

/**
 * 📦 PlanosService
 * Serviço responsável pelo gerenciamento dos planos financeiros.
 */
@Injectable()
export class PlanosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🔍 Lista todos os planos existentes.
   */
  async findAll() {
    return this.prisma.plano.findMany();
  }

  /**
   * ➕ Cria um novo plano no sistema.
   * @param data - Dados necessários para criação do plano.
   */
  async create(data: Prisma.PlanoCreateInput) {
    return this.prisma.plano.create({ data });
  }

  /**
   * ✏️ Atualiza os dados de um plano existente.
   * @param id - ID do plano a ser atualizado.
   * @param data - Novos dados do plano.
   */
  async update(id: string, data: Prisma.PlanoUpdateInput) {
    const existing = await this.prisma.plano.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Plano com ID ${id} não encontrado.`);
    }

    return this.prisma.plano.update({ where: { id }, data });
  }

  /**
   * ❌ Remove um plano do sistema.
   * @param id - ID do plano a ser removido.
   */
  async remove(id: string) {
    const existing = await this.prisma.plano.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Plano com ID ${id} não encontrado.`);
    }

    await this.prisma.plano.delete({ where: { id } });
    return { message: `Plano com ID ${id} removido com sucesso.` };
  }
}
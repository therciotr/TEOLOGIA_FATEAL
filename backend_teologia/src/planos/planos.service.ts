// src/planos/planos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PlanosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista todos os planos disponíveis.
   */
  async findAll() {
    return this.prisma.plano.findMany();
  }

  /**
   * Cria um novo plano.
   * @param data - Dados do novo plano.
   */
  async create(data: any) {
    return this.prisma.plano.create({ data });
  }

  /**
   * Atualiza um plano existente.
   * @param id - ID do plano.
   * @param data - Novos dados do plano.
   */
  async update(id: string, data: any) {
    // Verifica se o plano existe antes de atualizar.
    const existingPlano = await this.prisma.plano.findUnique({
      where: { id },
    });
    if (!existingPlano) {
      throw new NotFoundException(`Plano com ID ${id} não encontrado.`);
    }

    return this.prisma.plano.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove um plano.
   * @param id - ID do plano.
   */
  async remove(id: string) {
    // Verifica se o plano existe antes de remover.
    const existingPlano = await this.prisma.plano.findUnique({
      where: { id },
    });
    if (!existingPlano) {
      throw new NotFoundException(`Plano com ID ${id} não encontrado.`);
    }

    await this.prisma.plano.delete({
      where: { id },
    });

    return { message: `Plano com ID ${id} removido com sucesso!` };
  }
}
// src/planos/planos.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Plano, Prisma } from '@prisma/client';

/**
 * 📦 PlanosService
 * Serviço responsável pelo gerenciamento dos planos financeiros.
 */
@Injectable()
export class PlanosService {
  private readonly logger = new Logger(PlanosService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🔍 Lista todos os planos existentes.
   * @returns Lista de planos cadastrados.
   */
  async findAll(): Promise<Plano[]> {
    return this.prisma.plano.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  /**
   * ➕ Cria um novo plano no sistema.
   * @param data - Dados necessários para criação do plano.
   * @returns O plano criado.
   */
  async create(data: Prisma.PlanoCreateInput): Promise<Plano> {
    try {
      return await this.prisma.plano.create({ data });
    } catch (error) {
      this.logger.error('Erro ao criar plano:', error);
      throw new BadRequestException('Erro ao criar o plano.');
    }
  }

  /**
   * ✏️ Atualiza os dados de um plano existente.
   * @param id - ID do plano a ser atualizado.
   * @param data - Novos dados do plano.
   * @returns O plano atualizado.
   */
  async update(id: string, data: Prisma.PlanoUpdateInput): Promise<Plano> {
    const existing = await this.prisma.plano.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Plano com ID ${id} não encontrado.`);
    }

    return this.prisma.plano.update({ where: { id }, data });
  }

  /**
   * ❌ Remove um plano do sistema.
   * @param id - ID do plano a ser removido.
   * @returns Mensagem de sucesso.
   */
  async remove(id: string): Promise<{ message: string }> {
    const existing = await this.prisma.plano.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Plano com ID ${id} não encontrado.`);
    }

    await this.prisma.plano.delete({ where: { id } });
    return { message: `Plano com ID ${id} removido com sucesso.` };
  }
}
// src/turmas/turmas.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, Turma } from '@prisma/client';

@Injectable()
export class TurmasService {
  private readonly logger = new Logger(TurmasService.name);

  constructor(private readonly prisma: PrismaService) {}

  /* ───────────── READ ───────────── */
  /** Lista todas as turmas com o plano associado */
  async findAll(): Promise<Turma[]> {
    return this.prisma.turma.findMany({
      include: { plano: true },
      orderBy: { nome: 'asc' },
    });
  }

  /** Busca turma por ID (com plano) */
  async findOne(id: string): Promise<Turma> {
    const turma = await this.prisma.turma.findUnique({
      where: { id },
      include: { plano: true },
    });

    if (!turma) {
      throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    }
    return turma;
  }

  /* ───────────── CREATE ───────────── */
  /** Cria nova turma */
  async create(data: Prisma.TurmaCreateInput): Promise<Turma> {
    try {
      return await this.prisma.turma.create({ data });
    } catch (error) {
      this.logger.error('Erro ao criar turma', error);
      throw new BadRequestException('Falha ao criar a turma.');
    }
  }

  /* ───────────── UPDATE ───────────── */
  /** Atualiza dados da turma */
  async update(
    id: string,
    data: Prisma.TurmaUpdateInput,
  ): Promise<Turma> {
    await this.findOne(id); // 404 se não existir
    return this.prisma.turma.update({
      where: { id },
      data,
    });
  }

  /* ───────────── DELETE ───────────── */
  /** Remove turma pelo ID */
  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // 404 se não existir
    await this.prisma.turma.delete({ where: { id } });
    return { message: `Turma com ID ${id} removida com sucesso.` };
  }
}
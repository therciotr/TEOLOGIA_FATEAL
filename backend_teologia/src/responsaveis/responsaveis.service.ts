// src/responsaveis/responsaveis.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { Responsavel } from '@prisma/client';

@Injectable()
export class ResponsaveisService {
  private readonly logger = new Logger(ResponsaveisService.name);

  constructor(private readonly prisma: PrismaService) {}

  /* ───────────── CREATE ───────────── */
  async create(data: CreateResponsavelDto): Promise<Responsavel> {
    try {
      return await this.prisma.responsavel.create({ data });
    } catch (error) {
      this.logger.error('Erro ao criar responsável', error);
      throw new BadRequestException('Falha ao criar responsável.');
    }
  }

  /* ───────────── READ ───────────── */
  async findAll(): Promise<Responsavel[]> {
    return this.prisma.responsavel.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string): Promise<Responsavel> {
    const responsavel = await this.prisma.responsavel.findUnique({
      where: { id },
    });
    if (!responsavel) {
      throw new NotFoundException(
        `Responsável com ID ${id} não encontrado.`,
      );
    }
    return responsavel;
  }

  /* ───────────── UPDATE ───────────── */
  async update(
    id: string,
    data: UpdateResponsavelDto,
  ): Promise<Responsavel> {
    await this.findOne(id); // lança 404 se não existir
    return this.prisma.responsavel.update({
      where: { id },
      data,
    });
  }

  /* ───────────── DELETE ───────────── */
  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // garante existência
    await this.prisma.responsavel.delete({ where: { id } });
    return {
      message: `Responsável com ID ${id} removido com sucesso.`,
    };
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { Responsavel } from '@prisma/client';

@Injectable()
export class ResponsaveisService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateResponsavelDto): Promise<Responsavel> {
    return this.prisma.responsavel.create({ data });
  }

  async findAll(): Promise<Responsavel[]> {
    return this.prisma.responsavel.findMany({
      orderBy: { nome: 'asc' }, // opcional
    });
  }

  async findOne(id: string): Promise<Responsavel> {
    const responsavel = await this.prisma.responsavel.findUnique({
      where: { id },
    });
    if (!responsavel) {
      throw new NotFoundException(`Responsável com ID ${id} não encontrado`);
    }
    return responsavel;
  }

  async update(id: string, data: UpdateResponsavelDto): Promise<Responsavel> {
    await this.findOne(id);
    return this.prisma.responsavel.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.responsavel.delete({ where: { id } });
    return { message: `Responsável com ID ${id} removido com sucesso.` };
  }
}
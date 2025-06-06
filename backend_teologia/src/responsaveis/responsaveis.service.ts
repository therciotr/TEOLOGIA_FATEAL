// src/responsaveis/responsaveis.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';

@Injectable()
export class ResponsaveisService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateResponsavelDto) {
    return this.prisma.responsavel.create({ data });
  }

  async findAll() {
    return this.prisma.responsavel.findMany();
  }

  async findOne(id: string) {
    const responsavel = await this.prisma.responsavel.findUnique({
      where: { id },
    });
    if (!responsavel) {
      throw new NotFoundException(`Responsável com ID ${id} não encontrado`);
    }
    return responsavel;
  }

  async update(id: string, data: UpdateResponsavelDto) {
    await this.findOne(id); // Verifica existência
    return this.prisma.responsavel.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica existência
    return this.prisma.responsavel.delete({
      where: { id },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PlanosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.plano.findMany();
  }

  async create(data: any) {
    return this.prisma.plano.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.plano.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.plano.delete({
      where: { id },
    });
  }
}
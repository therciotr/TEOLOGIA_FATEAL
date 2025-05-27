import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ResponsaveisService {
  private prisma = new PrismaClient();

  findAll() {
    return this.prisma.responsavel.findMany();
  }

  findOne(id: string) {
    return this.prisma.responsavel.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.responsavel.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.responsavel.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.responsavel.delete({ where: { id } });
  }
}
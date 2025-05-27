import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlanosService {
  private prisma = new PrismaClient();

  findAll() {
    return this.prisma.plano.findMany();
  }

  findOne(id: string) {
    return this.prisma.plano.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.plano.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.plano.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.plano.delete({ where: { id } });
  }
}
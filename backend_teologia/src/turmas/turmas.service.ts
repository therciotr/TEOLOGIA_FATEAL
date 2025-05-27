import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TurmasService {
  private prisma = new PrismaClient();

  findAll() {
    return this.prisma.turma.findMany();
  }

  findOne(id: string) {
    return this.prisma.turma.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.turma.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.turma.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.turma.delete({ where: { id } });
  }
}
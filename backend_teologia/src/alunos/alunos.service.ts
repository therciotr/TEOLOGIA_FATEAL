import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AlunosService {
  private prisma = new PrismaClient();

  findAll() {
    return this.prisma.aluno.findMany();
  }

  findOne(id: string) {
    return this.prisma.aluno.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.aluno.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.aluno.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.aluno.delete({ where: { id } });
  }
}
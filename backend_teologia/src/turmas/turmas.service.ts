import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TurmasService {
  private prisma = new PrismaClient();

  // Popula o plano de cada turma
  findAll() {
    return this.prisma.turma.findMany({
      include: {
        plano: true, // Inclui o objeto completo do plano (id, nome, etc.)
      },
    });
  }

  findOne(id: string) {
    return this.prisma.turma.findUnique({
      where: { id },
      include: {
        plano: true, // Inclui o objeto completo do plano também em findOne (opcional)
      },
    });
  }

  create(data: any) {
    return this.prisma.turma.create({
      data,
    });
  }

  update(id: string, data: any) {
    return this.prisma.turma.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.turma.delete({
      where: { id },
    });
  }
}
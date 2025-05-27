import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MensalidadesService {
  private prisma = new PrismaClient();

  findAll() {
    return this.prisma.mensalidade.findMany();
  }

  findOne(id: string) {
    return this.prisma.mensalidade.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.mensalidade.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.mensalidade.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.mensalidade.delete({ where: { id } });
  }

  async gerarMensalidades() {
    const alunos = await this.prisma.aluno.findMany();
    const mensalidades = await Promise.all(alunos.map(aluno => 
      this.prisma.mensalidade.create({
        data: {
          aluno_id: aluno.id,
          valor: 200.00,
          vencimento: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          status: 'pendente'
        }
      })
    ));
    return mensalidades;
  }
}
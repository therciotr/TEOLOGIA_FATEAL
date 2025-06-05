import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';

@Injectable()
export class MensalidadesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria uma nova mensalidade.
   */
  async create(data: CreateMensalidadeDto) {
    return this.prisma.mensalidade.create({
      data,
    });
  }

  /**
   * Lista todas as mensalidades.
   */
  async findAll() {
    return this.prisma.mensalidade.findMany({
      include: { aluno: true },
    });
  }

  /**
   * Busca mensalidade por ID.
   */
  async findOne(id: string) {
    return this.prisma.mensalidade.findUnique({
      where: { id },
      include: { aluno: true },
    });
  }

  /**
   * Atualiza uma mensalidade.
   */
  async update(id: string, data: UpdateMensalidadeDto) {
    return this.prisma.mensalidade.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove uma mensalidade.
   */
  async remove(id: string) {
    return this.prisma.mensalidade.delete({
      where: { id },
    });
  }

  /**
   * Gera mensalidades para todos os alunos (exemplo básico).
   */
  async gerarMensalidades() {
    // Lógica real de geração de mensalidades (exemplo simples)
    const alunos = await this.prisma.aluno.findMany();

    for (const aluno of alunos) {
      await this.prisma.mensalidade.create({
        data: {
          alunoId: aluno.id,
          valor: 100.0,
          vencimento: new Date(),
          status: 'pendente',
        },
      });
    }

    return { message: 'Mensalidades geradas com sucesso!' };
  }
}
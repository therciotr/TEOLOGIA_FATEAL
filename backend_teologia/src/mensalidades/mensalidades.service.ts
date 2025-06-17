// src/mensalidades/mensalidades.service.ts
import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';

@Injectable()
export class MensalidadesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('FIRESTORE')
    private readonly firestore: FirebaseFirestore.Firestore,
  ) {}

  /* ─────────────────────────── CREATE ─────────────────────────── */
  async create(dto: CreateMensalidadeDto) {
    const data: Prisma.MensalidadeCreateInput = {
      aluno: { connect: { id: dto.alunoId } },
      valor: new Prisma.Decimal(dto.valor),
      vencimento: new Date(dto.vencimento),
      status: dto.status ?? 'pendente',
    };

    const mensalidade = await this.prisma.mensalidade.create({ data });

    // Firestore dual-write
    await this.firestore
      .collection('mensalidades')
      .doc(mensalidade.id)
      .set(mensalidade);

    return mensalidade;
  }

  /* ─────────────────────────── READ ─────────────────────────── */
  findAll() {
    return this.prisma.mensalidade.findMany({ include: { aluno: true } });
  }

  findOne(id: string) {
    return this.prisma.mensalidade.findUnique({
      where: { id },
      include: { aluno: true },
    });
  }

  /* ─────────────────────────── UPDATE ─────────────────────────── */
  async update(id: string, dto: UpdateMensalidadeDto) {
    const data: Prisma.MensalidadeUpdateInput = {
      valor:
        dto.valor !== undefined ? new Prisma.Decimal(dto.valor) : undefined,
      vencimento:
        dto.vencimento !== undefined ? new Date(dto.vencimento) : undefined,
      status: dto.status,
    };

    const mens = await this.prisma.mensalidade.update({ where: { id }, data });

    await this.firestore
      .collection('mensalidades')
      .doc(id)
      .update({ ...mens, updatedAt: new Date() });

    return mens;
  }

  /* ─────────────────────────── DELETE ─────────────────────────── */
  async remove(id: string) {
    await this.prisma.mensalidade.delete({ where: { id } });
    await this.firestore.collection('mensalidades').doc(id).delete();
    return { message: `Mensalidade ${id} removida com sucesso!` };
  }

  /* ──────────────────────── GERAÇÃO EM MASSA ───────────────────── */
  async gerarMensalidades() {
    const alunos = await this.prisma.aluno.findMany();
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const vencimento = new Date(ano, mes, 10); // dia 10 do mês corrente

    let geradas = 0;

    for (const aluno of alunos) {
      const existe = await this.prisma.mensalidade.findFirst({
        where: {
          alunoId: aluno.id,
          vencimento: {
            gte: new Date(ano, mes, 1),
            lt: new Date(ano, mes + 1, 1),
          },
        },
      });

      if (existe) continue; // já existe mensalidade para este mês

      const nova = await this.prisma.mensalidade.create({
        data: {
          alunoId: aluno.id,
          valor: new Prisma.Decimal(100.0), // valor fixo (ajuste se preciso)
          vencimento,
          status: 'pendente',
        },
      });

      await this.firestore
        .collection('mensalidades')
        .doc(nova.id)
        .set(nova);

      geradas++;
    }

    if (geradas === 0) {
      throw new HttpException(
        'Nenhuma mensalidade nova precisava ser gerada.',
        HttpStatus.OK,
      );
    }

    return { message: `${geradas} mensalidades geradas com sucesso!` };
  }
}
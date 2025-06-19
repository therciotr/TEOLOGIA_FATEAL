// src/mensalidades/mensalidades.service.ts
import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma, MensalidadeStatus } from '@prisma/client';
import {
  Firestore,
  WriteBatch,
  DocumentReference,
} from 'firebase-admin/firestore';

import { PrismaService } from '@/prisma/prisma.service';
import { FIRESTORE } from '@firebase/firebase.module';
import {
  FIRESTORE_MENSALIDADES_COLLECTION as COLLECTION,
  FIRESTORE_BATCH_LIMIT,
} from '@/config/constants';

import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';

/**
 * Service responsável por CRUD de mensalidades e replicação no Firestore.
 *
 * 🔄  Todas as gravações no Firebase usam *batch* para reduzir round‑trips.
 * 🔢 `Prisma.Decimal` é convertido para `number` antes de sair do serviço.
 */
@Injectable()
export class MensalidadesService {
  private readonly logger = new Logger(MensalidadesService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(FIRESTORE) private readonly firestore: Firestore,
  ) {}

  /* ─────────────────────────────── HELPERS ────────────────────────────── */
  /** Converte recursivamente `Prisma.Decimal` → `number`. */
  private castDecimals(value: unknown): unknown {
    if (value instanceof Prisma.Decimal) return value.toNumber();
    if (Array.isArray(value)) return value.map((v) => this.castDecimals(v));
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [
          k,
          this.castDecimals(v),
        ]),
      );
    }
    return value;
  }

  /** Ajusta documento para serialização no Firestore. */
  private toFirestore<T extends Record<string, unknown>>(data: T): T {
    return this.castDecimals(data) as T;
  }

  private get collection() {
    return this.firestore.collection(COLLECTION);
  }

  /** Commita um batch e registra erro sem quebrar a aplicação. */
  private async commitBatch(batch: WriteBatch) {
    try {
      await batch.commit();
    } catch (err) {
      this.logger.error('Falha ao sincronizar com o Firestore', err);
    }
  }

  /** Garante que não excederemos o limite de 500 writes por batch. */
  private getFreeBatch(batches: WriteBatch[]): WriteBatch {
    let batch = batches[batches.length - 1];
    // @ts-ignore – propriedade privada mas estável
    if (!batch || batch._ops.length >= FIRESTORE_BATCH_LIMIT) {
      batch = this.firestore.batch();
      batches.push(batch);
    }
    return batch;
  }

  /* ───────────────────────────────── CREATE ───────────────────────────── */
  async create(dto: CreateMensalidadeDto) {
    const prismaData: Prisma.MensalidadeCreateInput = {
      aluno: { connect: { id: dto.alunoId } },
      valor: new Prisma.Decimal(dto.valor),
      vencimento: new Date(dto.vencimento),
      status: (dto.status as MensalidadeStatus) ?? MensalidadeStatus.pendente,
    };

    // 1️⃣ Banco relacional
    const mensalidade = await this.prisma.mensalidade.create({ data: prismaData });

    // 2️⃣ Firestore
    const batch = this.firestore.batch();
    batch.set(this.collection.doc(mensalidade.id), this.toFirestore(mensalidade));
    await this.commitBatch(batch);

    return mensalidade;
  }

  /* ───────────────────────────────── READ ────────────────────────────── */
  findAll() {
    return this.prisma.mensalidade.findMany({
      include: { aluno: true, pagamentos: true },
      orderBy: { vencimento: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.mensalidade.findUnique({
      where: { id },
      include: { aluno: true, pagamentos: true },
    });
  }

  /* ───────────────────────────────── UPDATE ───────────────────────────── */
  async update(id: string, dto: UpdateMensalidadeDto) {
    const prismaData: Prisma.MensalidadeUpdateInput = {
      valor: dto.valor !== undefined ? new Prisma.Decimal(dto.valor) : undefined,
      vencimento: dto.vencimento !== undefined ? new Date(dto.vencimento) : undefined,
      status: dto.status as MensalidadeStatus,
    };

    const mensalidade = await this.prisma.mensalidade.update({
      where: { id },
      data: prismaData,
    });

    const batch = this.firestore.batch();
    batch.update(this.collection.doc(id), {
      ...this.toFirestore(mensalidade),
      updatedAt: new Date(),
    });
    await this.commitBatch(batch);

    return mensalidade;
  }

  /* ───────────────────────────────── DELETE ───────────────────────────── */
  async remove(id: string) {
    await this.prisma.mensalidade.delete({ where: { id } });

    const batch = this.firestore.batch();
    batch.delete(this.collection.doc(id));
    await this.commitBatch(batch);

    return { message: `Mensalidade ${id} removida com sucesso!` };
  }

  /* ─────── GERAÇÃO EM MASSA PARA O MÊS CORRENTE (idempotente) ─────────── */
  async gerarMensalidades(valorPadrao = 100) {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const inicioMes = new Date(ano, mes, 1);
    const fimMes = new Date(ano, mes + 1, 1);
    const vencimentoPadrao = new Date(ano, mes, 10);

    // 🗂️ alunos
    const alunos = await this.prisma.aluno.findMany({ select: { id: true } });

    // 🔍 mensalidades já existentes (evita N+1 queries)
    const existentes = await this.prisma.mensalidade.findMany({
      where: {
        vencimento: { gte: inicioMes, lt: fimMes },
      },
      select: { alunoId: true },
    });
    const bloqueados = new Set(existentes.map((m) => m.alunoId));

    let count = 0;
    const batches: WriteBatch[] = [this.firestore.batch()];

    for (const { id: alunoId } of alunos) {
      if (bloqueados.has(alunoId)) continue;

      // DB
      const mensalidade = await this.prisma.mensalidade.create({
        data: {
          alunoId,
          valor: new Prisma.Decimal(valorPadrao),
          vencimento: vencimentoPadrao,
          status: MensalidadeStatus.pendente,
        },
      });

      // Firestore (chunkado)
      const batch = this.getFreeBatch(batches);
      batch.set(this.collection.doc(mensalidade.id), this.toFirestore(mensalidade));
      count++;
    }

    // commit todos batches
    await Promise.all(batches.map((b) => this.commitBatch(b)));

    if (count === 0) {
      throw new HttpException(
        'Nenhuma mensalidade precisava ser gerada.',
        HttpStatus.OK,
      );
    }

    return { message: `${count} mensalidade(s) geradas com sucesso!` };
  }
}

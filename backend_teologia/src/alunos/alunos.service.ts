// src/alunos/alunos.service.ts
import {
  Injectable,
  NotFoundException,
  Inject,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Firestore, WriteBatch } from 'firebase-admin/firestore';

// ✅ token exportado em firebase/firebase.module.ts
import { FIRESTORE_PROVIDER } from '@firebase/firebase.module';

@Injectable()
export class AlunosService {
  private readonly logger = new Logger(AlunosService.name);

  constructor(
    private readonly prisma: PrismaService,

    // injeta a instância de Firestore provida pelo módulo Firebase
    @Inject(FIRESTORE_PROVIDER)
    private readonly firestore: Firestore,
  ) {}

  /* ──────────────────────── CREATE ──────────────────────── */
  /**
   * Cria aluno no MySQL (Prisma) e replica no Firestore.
   * Usa batch para garantir atomicidade no Firestore.
   */
  async create(dto: CreateAlunoDto) {
    try {
      const aluno = await this.prisma.aluno.create({
        data: {
          ...dto,
          documentos: dto.documentos?.length
            ? {
                create: dto.documentos.map((d) => ({
                  nome: d.nome,
                  url: d.url,
                })),
              }
            : undefined,
        },
        include: { documentos: true, turma: true },
      });

      // Firestore dual-write
      const batch = this.firestore.batch();
      const docRef = this.firestore.collection('alunos').doc(aluno.id);
      batch.set(docRef, { ...aluno, createdAt: aluno.createdAt ?? new Date() });
      await batch.commit();

      return aluno;
    } catch (err) {
      this.logger.error('Falha ao criar aluno', err);
      throw new BadRequestException('Erro ao criar aluno.');
    }
  }

  /* ──────────────────────── READ ──────────────────────── */
  async findAll() {
    return this.prisma.aluno.findMany({
      include: { documentos: true, turma: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
      include: { documentos: true, turma: true },
    });
    if (!aluno) throw new NotFoundException('Aluno não encontrado.');
    return aluno;
  }

  /* ─────────────────────── UPDATE ─────────────────────── */
  /**
   * Atualiza aluno em ambas as bases.
   * Remove todos os documentos antigos e cria os novos (padrão simples).
   */
  async update(id: string, dto: UpdateAlunoDto) {
    const aluno = await this.prisma.aluno.update({
      where: { id },
      data: {
        ...dto,
        documentos: dto.documentos
          ? {
              deleteMany: {}, // limpa anteriores
              create: dto.documentos.map((d) => ({ nome: d.nome, url: d.url })),
            }
          : undefined,
      },
      include: { documentos: true, turma: true },
    });

    // Firestore dual-write
    const batch: WriteBatch = this.firestore.batch();
    const docRef = this.firestore.collection('alunos').doc(id);
    batch.update(docRef, { ...aluno, updatedAt: new Date() });
    await batch.commit();

    return aluno;
  }

  /* ─────────────────────── DELETE ─────────────────────── */
  async remove(id: string) {
    await this.prisma.aluno.delete({ where: { id } });

    const batch = this.firestore.batch();
    batch.delete(this.firestore.collection('alunos').doc(id));
    await batch.commit();

    return { message: `Aluno ${id} removido com sucesso!` };
  }
}
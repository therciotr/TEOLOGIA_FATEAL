import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject('FIRESTORE')
    private readonly firestore: FirebaseFirestore.Firestore,
  ) {}

  /** 🔹 Cria um novo aluno no banco relacional e replica no Firestore. */
  async create(data: CreateAlunoDto) {
    const aluno = await this.prisma.aluno.create({
      data: {
        ...data,
        documentos: data.documentos?.length
          ? {
              create: data.documentos.map((doc) => ({
                nome: doc.nome,
                url: doc.url,
              })),
            }
          : undefined,
      },
    });

    await this.firestore
      .collection('alunos')
      .doc(aluno.id)
      .set({
        ...aluno,
        createdAt: aluno.createdAt || new Date(),
      });

    return aluno;
  }

  /** 🔹 Lista todos os alunos com documentos e turma. */
  async findAll() {
    return this.prisma.aluno.findMany({
      include: {
        documentos: true,
        turma: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /** 🔹 Busca único aluno pelo ID. */
  async findOne(id: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
      include: {
        documentos: true,
        turma: true,
      },
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    return aluno;
  }

  /** 🔹 Atualiza aluno e sincroniza dados no Firestore. */
  async update(id: string, data: UpdateAlunoDto) {
    const aluno = await this.prisma.aluno.update({
      where: { id },
      data: {
        ...data,
        documentos: data.documentos
          ? {
              deleteMany: {}, // Remove todos os documentos antigos
              create: data.documentos.map((doc) => ({
                nome: doc.nome,
                url: doc.url,
              })),
            }
          : undefined,
      },
      include: {
        documentos: true,
        turma: true,
      },
    });

    await this.firestore
      .collection('alunos')
      .doc(id)
      .update({
        ...aluno,
        updatedAt: new Date(),
      });

    return aluno;
  }

  /** 🔹 Exclui aluno do banco e do Firestore. */
  async remove(id: string) {
    await this.prisma.aluno.delete({ where: { id } });

    await this.firestore.collection('alunos').doc(id).delete();

    return { message: `Aluno com ID ${id} removido com sucesso!` };
  }
}
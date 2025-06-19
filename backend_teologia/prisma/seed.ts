// prisma/seed.ts
import 'dotenv/config';
import {
  PrismaClient,
  MensalidadeStatus,
  MetodoPagamento,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);

async function main() {
  /* Admin --------------------------------------------------- */
  const adminEmail = 'admin@fateal.com';
  const adminSenha = 'Admin123';

  /* Plano --------------------------------------------------- */
  const planoBasico = await prisma.plano.upsert({
    where: { nome: 'Plano Básico' },
    update: {},
    create: { nome: 'Plano Básico', valorPadrao: 120.0 },
  });

  /* Turma --------------------------------------------------- */
  const turma2025 = await prisma.turma.upsert({
    where: { nome: 'Turma 2025-A' },
    update: {},
    create: { nome: 'Turma 2025-A', planoId: planoBasico.id },
  });

  /* Usuário admin ------------------------------------------ */
  const admin = await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      nome: 'Administrador',
      email: adminEmail,
      perfil: 'admin',
      ativo: true,
      senha: await bcrypt.hash(adminSenha, SALT_ROUNDS),
    },
  });

  /* Aluno + Responsável ------------------------------------ */
  const alunoEmail = 'aluno@fateal.com';

  const aluno = await prisma.aluno.upsert({
    where: { email: alunoEmail },
    update: {},
    create: {
      nome: 'Primeiro Aluno',
      email: alunoEmail,
      turmaId: turma2025.id,
      responsaveis: {
        create: {
          parentesco: 'Pai',               // se existir no schema
          responsavel: {
            create: {
              nome: 'Responsável do Aluno',
              email: 'responsavel@fateal.com',
              telefone: '+5582999999999',
            },
          },
        },
      },
    },
    include: { responsaveis: true },
  });

  /* Mensalidade + Pagamento demo --------------------------- */
  const hoje = new Date();
  const vencimento = new Date(hoje.getFullYear(), hoje.getMonth(), 10);

  const mensalidade = await prisma.mensalidade.upsert({
    where: {
      alunoId_vencimento: { alunoId: aluno.id, vencimento },
    },
    update: {},
    create: {
      valor: planoBasico.valorPadrao,
      vencimento,
      status: MensalidadeStatus.pago,
      alunoId: aluno.id,
    },
  });

  await prisma.pagamento.upsert({
    where: {
      mensalidadeId_metodo: {
        mensalidadeId: mensalidade.id,
        metodo: MetodoPagamento.pix,
      },
    },
    update: {},
    create: {
      valorPago: mensalidade.valor,
      metodo: MetodoPagamento.pix,
      mensalidadeId: mensalidade.id,
      dataPagamento: new Date(),
    },
  });

  /* Resumo -------------------------------------------------- */
  console.table({
    Admin: admin.email,
    Plano: planoBasico.nome,
    Turma: turma2025.nome,
    Aluno: aluno.email,
    Mensalidade: mensalidade.id,
  });
}

/* Execução segura ------------------------------------------ */
main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
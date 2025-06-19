"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const SALT_ROUNDS = parseInt((_a = process.env.BCRYPT_SALT_ROUNDS) !== null && _a !== void 0 ? _a : '10', 10);
async function main() {
    const adminEmail = 'admin@fateal.com';
    const adminSenha = 'Admin123';
    const planoBasico = await prisma.plano.upsert({
        where: { nome: 'Plano Básico' },
        update: {},
        create: { nome: 'Plano Básico', valorPadrao: 120.0 },
    });
    const turma2025 = await prisma.turma.upsert({
        where: { nome: 'Turma 2025-A' },
        update: {},
        create: { nome: 'Turma 2025-A', planoId: planoBasico.id },
    });
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
                    parentesco: 'Pai',
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
            status: client_1.MensalidadeStatus.pago,
            alunoId: aluno.id,
        },
    });
    await prisma.pagamento.upsert({
        where: {
            mensalidadeId_metodo: {
                mensalidadeId: mensalidade.id,
                metodo: client_1.MetodoPagamento.pix,
            },
        },
        update: {},
        create: {
            valorPago: mensalidade.valor,
            metodo: client_1.MetodoPagamento.pix,
            mensalidadeId: mensalidade.id,
            dataPagamento: new Date(),
        },
    });
    console.table({
        Admin: admin.email,
        Plano: planoBasico.nome,
        Turma: turma2025.nome,
        Aluno: aluno.email,
        Mensalidade: mensalidade.id,
    });
}
main()
    .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});

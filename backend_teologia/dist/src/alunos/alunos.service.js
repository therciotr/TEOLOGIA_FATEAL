"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AlunosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const firestore_1 = require("firebase-admin/firestore");
const firebase_module_1 = require("../../firebase/firebase.module");
let AlunosService = AlunosService_1 = class AlunosService {
    constructor(prisma, firestore) {
        this.prisma = prisma;
        this.firestore = firestore;
        this.logger = new common_1.Logger(AlunosService_1.name);
    }
    async create(dto) {
        var _a, _b;
        try {
            const aluno = await this.prisma.aluno.create({
                data: Object.assign(Object.assign({}, dto), { documentos: ((_a = dto.documentos) === null || _a === void 0 ? void 0 : _a.length)
                        ? {
                            create: dto.documentos.map((d) => ({
                                nome: d.nome,
                                url: d.url,
                            })),
                        }
                        : undefined }),
                include: { documentos: true, turma: true },
            });
            const batch = this.firestore.batch();
            const docRef = this.firestore.collection('alunos').doc(aluno.id);
            batch.set(docRef, Object.assign(Object.assign({}, aluno), { createdAt: (_b = aluno.createdAt) !== null && _b !== void 0 ? _b : new Date() }));
            await batch.commit();
            return aluno;
        }
        catch (err) {
            this.logger.error('Falha ao criar aluno', err);
            throw new common_1.BadRequestException('Erro ao criar aluno.');
        }
    }
    async findAll() {
        return this.prisma.aluno.findMany({
            include: { documentos: true, turma: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const aluno = await this.prisma.aluno.findUnique({
            where: { id },
            include: { documentos: true, turma: true },
        });
        if (!aluno)
            throw new common_1.NotFoundException('Aluno não encontrado.');
        return aluno;
    }
    async update(id, dto) {
        const aluno = await this.prisma.aluno.update({
            where: { id },
            data: Object.assign(Object.assign({}, dto), { documentos: dto.documentos
                    ? {
                        deleteMany: {},
                        create: dto.documentos.map((d) => ({ nome: d.nome, url: d.url })),
                    }
                    : undefined }),
            include: { documentos: true, turma: true },
        });
        const batch = this.firestore.batch();
        const docRef = this.firestore.collection('alunos').doc(id);
        batch.update(docRef, Object.assign(Object.assign({}, aluno), { updatedAt: new Date() }));
        await batch.commit();
        return aluno;
    }
    async remove(id) {
        await this.prisma.aluno.delete({ where: { id } });
        const batch = this.firestore.batch();
        batch.delete(this.firestore.collection('alunos').doc(id));
        await batch.commit();
        return { message: `Aluno ${id} removido com sucesso!` };
    }
};
exports.AlunosService = AlunosService;
exports.AlunosService = AlunosService = AlunosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(firebase_module_1.FIRESTORE_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        firestore_1.Firestore])
], AlunosService);

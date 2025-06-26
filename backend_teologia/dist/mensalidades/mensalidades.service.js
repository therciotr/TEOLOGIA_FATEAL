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
var MensalidadesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MensalidadesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const firestore_1 = require("firebase-admin/firestore");
const prisma_service_1 = require("../prisma/prisma.service");
const firebase_module_1 = require("../firebase/firebase.module");
const constants_1 = require("../config/constants");
let MensalidadesService = MensalidadesService_1 = class MensalidadesService {
    constructor(prisma, firestore) {
        this.prisma = prisma;
        this.firestore = firestore;
        this.logger = new common_1.Logger(MensalidadesService_1.name);
    }
    castDecimals(value) {
        if (value instanceof client_1.Prisma.Decimal)
            return value.toNumber();
        if (Array.isArray(value))
            return value.map((v) => this.castDecimals(v));
        if (value && typeof value === 'object') {
            return Object.fromEntries(Object.entries(value).map(([k, v]) => [
                k,
                this.castDecimals(v),
            ]));
        }
        return value;
    }
    toFirestore(data) {
        return this.castDecimals(data);
    }
    get collection() {
        return this.firestore.collection(constants_1.FIRESTORE_MENSALIDADES_COLLECTION);
    }
    async commitBatch(batch) {
        try {
            await batch.commit();
        }
        catch (err) {
            this.logger.error('Falha ao sincronizar com o Firestore', err);
        }
    }
    getFreeBatch(batches) {
        let batch = batches[batches.length - 1];
        if (!batch || batch._ops.length >= constants_1.FIRESTORE_BATCH_LIMIT) {
            batch = this.firestore.batch();
            batches.push(batch);
        }
        return batch;
    }
    async create(dto) {
        var _a;
        const prismaData = {
            aluno: { connect: { id: dto.alunoId } },
            valor: new client_1.Prisma.Decimal(dto.valor),
            vencimento: new Date(dto.vencimento),
            status: (_a = dto.status) !== null && _a !== void 0 ? _a : client_1.MensalidadeStatus.pendente,
        };
        const mensalidade = await this.prisma.mensalidade.create({ data: prismaData });
        const batch = this.firestore.batch();
        batch.set(this.collection.doc(mensalidade.id), this.toFirestore(mensalidade));
        await this.commitBatch(batch);
        return mensalidade;
    }
    findAll() {
        return this.prisma.mensalidade.findMany({
            include: { aluno: true, pagamentos: true },
            orderBy: { vencimento: 'asc' },
        });
    }
    findOne(id) {
        return this.prisma.mensalidade.findUnique({
            where: { id },
            include: { aluno: true, pagamentos: true },
        });
    }
    async update(id, dto) {
        const prismaData = {
            valor: dto.valor !== undefined ? new client_1.Prisma.Decimal(dto.valor) : undefined,
            vencimento: dto.vencimento !== undefined ? new Date(dto.vencimento) : undefined,
            status: dto.status,
        };
        const mensalidade = await this.prisma.mensalidade.update({
            where: { id },
            data: prismaData,
        });
        const batch = this.firestore.batch();
        batch.update(this.collection.doc(id), Object.assign(Object.assign({}, this.toFirestore(mensalidade)), { updatedAt: new Date() }));
        await this.commitBatch(batch);
        return mensalidade;
    }
    async remove(id) {
        await this.prisma.mensalidade.delete({ where: { id } });
        const batch = this.firestore.batch();
        batch.delete(this.collection.doc(id));
        await this.commitBatch(batch);
        return { message: `Mensalidade ${id} removida com sucesso!` };
    }
    async gerarMensalidades(valorPadrao = 100) {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = hoje.getMonth();
        const inicioMes = new Date(ano, mes, 1);
        const fimMes = new Date(ano, mes + 1, 1);
        const vencimentoPadrao = new Date(ano, mes, 10);
        const alunos = await this.prisma.aluno.findMany({ select: { id: true } });
        const existentes = await this.prisma.mensalidade.findMany({
            where: {
                vencimento: { gte: inicioMes, lt: fimMes },
            },
            select: { alunoId: true },
        });
        const bloqueados = new Set(existentes.map((m) => m.alunoId));
        let count = 0;
        const batches = [this.firestore.batch()];
        for (const { id: alunoId } of alunos) {
            if (bloqueados.has(alunoId))
                continue;
            const mensalidade = await this.prisma.mensalidade.create({
                data: {
                    alunoId,
                    valor: new client_1.Prisma.Decimal(valorPadrao),
                    vencimento: vencimentoPadrao,
                    status: client_1.MensalidadeStatus.pendente,
                },
            });
            const batch = this.getFreeBatch(batches);
            batch.set(this.collection.doc(mensalidade.id), this.toFirestore(mensalidade));
            count++;
        }
        await Promise.all(batches.map((b) => this.commitBatch(b)));
        if (count === 0) {
            throw new common_1.HttpException('Nenhuma mensalidade precisava ser gerada.', common_1.HttpStatus.OK);
        }
        return { message: `${count} mensalidade(s) geradas com sucesso!` };
    }
};
exports.MensalidadesService = MensalidadesService;
exports.MensalidadesService = MensalidadesService = MensalidadesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(firebase_module_1.FIRESTORE)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        firestore_1.Firestore])
], MensalidadesService);

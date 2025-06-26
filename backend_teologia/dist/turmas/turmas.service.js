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
var TurmasService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TurmasService = TurmasService_1 = class TurmasService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(TurmasService_1.name);
    }
    async findAll() {
        return this.prisma.turma.findMany({
            include: { plano: true },
            orderBy: { nome: 'asc' },
        });
    }
    async findOne(id) {
        const turma = await this.prisma.turma.findUnique({
            where: { id },
            include: { plano: true },
        });
        if (!turma) {
            throw new common_1.NotFoundException(`Turma com ID ${id} não encontrada.`);
        }
        return turma;
    }
    async create(data) {
        try {
            return await this.prisma.turma.create({ data });
        }
        catch (error) {
            this.logger.error('Erro ao criar turma', error);
            throw new common_1.BadRequestException('Falha ao criar a turma.');
        }
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.turma.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.turma.delete({ where: { id } });
        return { message: `Turma com ID ${id} removida com sucesso.` };
    }
};
exports.TurmasService = TurmasService;
exports.TurmasService = TurmasService = TurmasService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TurmasService);

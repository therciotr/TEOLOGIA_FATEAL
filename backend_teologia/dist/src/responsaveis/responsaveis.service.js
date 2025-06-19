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
var ResponsaveisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsaveisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ResponsaveisService = ResponsaveisService_1 = class ResponsaveisService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ResponsaveisService_1.name);
    }
    async create(data) {
        try {
            return await this.prisma.responsavel.create({ data });
        }
        catch (error) {
            this.logger.error('Erro ao criar responsável', error);
            throw new common_1.BadRequestException('Falha ao criar responsável.');
        }
    }
    async findAll() {
        return this.prisma.responsavel.findMany({
            orderBy: { nome: 'asc' },
        });
    }
    async findOne(id) {
        const responsavel = await this.prisma.responsavel.findUnique({
            where: { id },
        });
        if (!responsavel) {
            throw new common_1.NotFoundException(`Responsável com ID ${id} não encontrado.`);
        }
        return responsavel;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.responsavel.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.responsavel.delete({ where: { id } });
        return {
            message: `Responsável com ID ${id} removido com sucesso.`,
        };
    }
};
exports.ResponsaveisService = ResponsaveisService;
exports.ResponsaveisService = ResponsaveisService = ResponsaveisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResponsaveisService);

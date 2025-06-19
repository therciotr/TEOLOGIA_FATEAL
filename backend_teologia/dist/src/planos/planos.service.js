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
var PlanosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlanosService = PlanosService_1 = class PlanosService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PlanosService_1.name);
    }
    async findAll() {
        return this.prisma.plano.findMany({
            orderBy: { nome: 'asc' },
        });
    }
    async create(data) {
        try {
            return await this.prisma.plano.create({ data });
        }
        catch (error) {
            this.logger.error('Erro ao criar plano:', error);
            throw new common_1.BadRequestException('Erro ao criar o plano.');
        }
    }
    async update(id, data) {
        const existing = await this.prisma.plano.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException(`Plano com ID ${id} não encontrado.`);
        }
        return this.prisma.plano.update({ where: { id }, data });
    }
    async remove(id) {
        const existing = await this.prisma.plano.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException(`Plano com ID ${id} não encontrado.`);
        }
        await this.prisma.plano.delete({ where: { id } });
        return { message: `Plano com ID ${id} removido com sucesso.` };
    }
};
exports.PlanosService = PlanosService;
exports.PlanosService = PlanosService = PlanosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanosService);

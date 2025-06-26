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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsuariosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsuariosService = UsuariosService_1 = class UsuariosService {
    constructor(prisma) {
        var _a;
        this.prisma = prisma;
        this.logger = new common_1.Logger(UsuariosService_1.name);
        this.saltRounds = parseInt((_a = process.env.BCRYPT_SALT_ROUNDS) !== null && _a !== void 0 ? _a : '10', 10);
    }
    async create(dto) {
        const emailExists = await this.prisma.usuario.findUnique({
            where: { email: dto.email },
        });
        if (emailExists) {
            throw new common_1.BadRequestException('E-mail já cadastrado.');
        }
        const hashedPassword = await bcrypt.hash(dto.senha, this.saltRounds);
        return this.prisma.usuario.create({
            data: Object.assign(Object.assign({}, dto), { senha: hashedPassword }),
        });
    }
    async findAll() {
        return this.prisma.usuario.findMany({ orderBy: { nome: 'asc' } });
    }
    async findOne(id) {
        const usuario = await this.prisma.usuario.findUnique({ where: { id } });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        return usuario;
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.email) {
            const emailExists = await this.prisma.usuario.findFirst({
                where: { email: dto.email, id: { not: id } },
            });
            if (emailExists) {
                throw new common_1.BadRequestException('E-mail já está em uso por outro usuário.');
            }
        }
        const dataToUpdate = Object.assign({}, dto);
        if (dto.senha) {
            dataToUpdate.senha = await bcrypt.hash(dto.senha, this.saltRounds);
        }
        return this.prisma.usuario.update({
            where: { id },
            data: dataToUpdate,
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.usuario.delete({ where: { id } });
        return { message: `Usuário com ID ${id} removido com sucesso.` };
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = UsuariosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuariosService);

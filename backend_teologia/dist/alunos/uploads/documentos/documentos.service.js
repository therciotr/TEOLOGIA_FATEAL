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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const path_1 = require("path");
const fs_1 = require("fs");
const config_1 = require("@nestjs/config");
const constants_1 = require("../../../config/constants");
let DocumentosService = class DocumentosService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    buildPublicUrl(filename) {
        var _a;
        const base = (_a = this.config.get('UPLOADS_BASE_URL')) !== null && _a !== void 0 ? _a : '/uploads/documentos';
        return path_1.posix.join(base, filename);
    }
    async deletePhysicalFile(filePath) {
        try {
            await fs_1.promises.unlink(filePath);
        }
        catch (_a) {
        }
    }
    async create(data) {
        return this.prisma.documento.create({ data });
    }
    async findAll() {
        return this.prisma.documento.findMany({ include: { aluno: true } });
    }
    async findOne(id) {
        const doc = await this.prisma.documento.findUnique({
            where: { id },
            include: { aluno: true },
        });
        if (!doc) {
            throw new common_1.NotFoundException('Documento não encontrado');
        }
        return doc;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.documento.update({ where: { id }, data });
    }
    async remove(id) {
        var _a;
        const doc = await this.findOne(id);
        await this.prisma.documento.delete({ where: { id } });
        const uploadDir = (_a = this.config.get('UPLOADS_DIRECTORY')) !== null && _a !== void 0 ? _a : constants_1.DOCUMENTOS_UPLOAD_DIR;
        const filePath = (0, path_1.join)(uploadDir, path_1.posix.basename(doc.url));
        await this.deletePhysicalFile(filePath);
        return { message: `Documento ${id} removido com sucesso!` };
    }
    async salvarDocumentos(alunoId, arquivos) {
        if (!arquivos.length) {
            throw new common_1.BadRequestException('Nenhum arquivo enviado para upload.');
        }
        const aluno = await this.prisma.aluno.findUnique({ where: { id: alunoId } });
        if (!aluno) {
            throw new common_1.NotFoundException('Aluno não encontrado para upload.');
        }
        const documentosCriados = await Promise.all(arquivos.map((file) => this.prisma.documento.create({
            data: {
                nome: file.originalname,
                url: this.buildPublicUrl(file.filename),
                alunoId,
            },
        })));
        return documentosCriados;
    }
};
exports.DocumentosService = DocumentosService;
exports.DocumentosService = DocumentosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], DocumentosService);

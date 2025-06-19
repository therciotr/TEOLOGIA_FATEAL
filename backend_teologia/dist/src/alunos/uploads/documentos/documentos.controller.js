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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentosController = void 0;
const common_1 = require("@nestjs/common");
const documentos_service_1 = require("./documentos.service");
const create_documento_dto_1 = require("./dto/create-documento.dto");
const update_documento_dto_1 = require("./dto/update-documento.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
let DocumentosController = class DocumentosController {
    constructor(documentosService) {
        this.documentosService = documentosService;
    }
    create(dto) {
        return this.documentosService.create(dto);
    }
    findAll() {
        return this.documentosService.findAll();
    }
    findOne(id) {
        return this.documentosService.findOne(id);
    }
    update(id, dto) {
        return this.documentosService.update(id, dto);
    }
    remove(id) {
        return this.documentosService.remove(id);
    }
    async uploadDocumentos(alunoId, files) {
        if (!(files === null || files === void 0 ? void 0 : files.documentos) || files.documentos.length === 0) {
            throw new common_1.BadRequestException('Nenhum documento enviado.');
        }
        return this.documentosService.salvarDocumentos(alunoId, files.documentos);
    }
};
exports.DocumentosController = DocumentosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar documento manualmente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_documento_dto_1.CreateDocumentoDto]),
    __metadata("design:returntype", void 0)
], DocumentosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os documentos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar documento por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar documento' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_documento_dto_1.UpdateDocumentoDto]),
    __metadata("design:returntype", void 0)
], DocumentosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover documento' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload/:alunoId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'documentos', maxCount: 10 }], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/documentos',
            filename: (req, file, cb) => {
                const uniq = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `doc-${uniq}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!allowed.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException('Tipo de arquivo inválido. Aceito: PDF, JPG ou PNG.'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Upload de múltiplos documentos para um aluno',
        description: 'Aceita até 10 arquivos (PDF, JPG, PNG) de no máximo 5 MB cada.',
    }),
    __param(0, (0, common_1.Param)('alunoId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentosController.prototype, "uploadDocumentos", null);
exports.DocumentosController = DocumentosController = __decorate([
    (0, swagger_1.ApiTags)('Documentos'),
    (0, common_1.Controller)('documentos'),
    __metadata("design:paramtypes", [documentos_service_1.DocumentosService])
], DocumentosController);

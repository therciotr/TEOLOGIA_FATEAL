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
exports.AlunosController = void 0;
const common_1 = require("@nestjs/common");
const alunos_service_1 = require("./alunos.service");
const create_aluno_dto_1 = require("./dto/create-aluno.dto");
const update_aluno_dto_1 = require("./dto/update-aluno.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
let AlunosController = class AlunosController {
    constructor(alunosService) {
        this.alunosService = alunosService;
    }
    async create(createAlunoDto, foto3x4) {
        if (foto3x4) {
            createAlunoDto.fotoUrl = `/uploads/fotos/${foto3x4.filename}`;
        }
        return this.alunosService.create(createAlunoDto);
    }
    async findAll() {
        return this.alunosService.findAll();
    }
    async findOne(id) {
        return this.alunosService.findOne(id);
    }
    async update(id, updateAlunoDto, foto3x4) {
        if (foto3x4) {
            updateAlunoDto.fotoUrl = `/uploads/fotos/${foto3x4.filename}`;
        }
        return this.alunosService.update(id, updateAlunoDto);
    }
    async remove(id) {
        return this.alunosService.remove(id);
    }
};
exports.AlunosController = AlunosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar aluno com upload de foto 3x4' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('foto3x4', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/fotos',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `foto-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aluno_dto_1.CreateAlunoDto, Object]),
    __metadata("design:returntype", Promise)
], AlunosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os alunos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlunosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar aluno por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlunosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar dados do aluno' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('foto3x4', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/fotos',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `foto-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_aluno_dto_1.UpdateAlunoDto, Object]),
    __metadata("design:returntype", Promise)
], AlunosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover aluno' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlunosController.prototype, "remove", null);
exports.AlunosController = AlunosController = __decorate([
    (0, swagger_1.ApiTags)('Alunos'),
    (0, common_1.Controller)('alunos'),
    __metadata("design:paramtypes", [alunos_service_1.AlunosService])
], AlunosController);

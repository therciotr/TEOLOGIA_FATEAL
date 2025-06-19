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
exports.MensalidadesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mensalidades_service_1 = require("./mensalidades.service");
const create_mensalidade_dto_1 = require("./dto/create-mensalidade.dto");
const update_mensalidade_dto_1 = require("./dto/update-mensalidade.dto");
let MensalidadesController = class MensalidadesController {
    constructor(service) {
        this.service = service;
    }
    async findAll() {
        return this.service.findAll();
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.HttpException('ID da mensalidade não informado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.service.findOne(id);
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async gerarMensalidades() {
        return this.service.gerarMensalidades();
    }
    async update(id, dto) {
        if (!id) {
            throw new common_1.HttpException('ID da mensalidade não informado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.service.update(id, dto);
    }
    async remove(id) {
        if (!id) {
            throw new common_1.HttpException('ID da mensalidade não informado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.service.remove(id);
    }
};
exports.MensalidadesController = MensalidadesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as mensalidades' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MensalidadesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da mensalidade' }),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar uma mensalidade específica' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MensalidadesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova mensalidade' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mensalidade_dto_1.CreateMensalidadeDto]),
    __metadata("design:returntype", Promise)
], MensalidadesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/gerar'),
    (0, swagger_1.ApiOperation)({
        summary: 'Gerar mensalidades em massa para o mês atual',
        description: 'Cria automaticamente mensalidades pendentes para todos os alunos que ainda não possuem uma no mês corrente.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MensalidadesController.prototype, "gerarMensalidades", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da mensalidade' }),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar mensalidade' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_mensalidade_dto_1.UpdateMensalidadeDto]),
    __metadata("design:returntype", Promise)
], MensalidadesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da mensalidade' }),
    (0, swagger_1.ApiOperation)({ summary: 'Remover mensalidade' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MensalidadesController.prototype, "remove", null);
exports.MensalidadesController = MensalidadesController = __decorate([
    (0, swagger_1.ApiTags)('Mensalidades'),
    (0, common_1.Controller)('mensalidades'),
    __metadata("design:paramtypes", [mensalidades_service_1.MensalidadesService])
], MensalidadesController);

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
exports.PagamentosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagamentos_service_1 = require("./pagamentos.service");
const create_pagamento_dto_1 = require("./dto/create-pagamento.dto");
let PagamentosController = class PagamentosController {
    constructor(service) {
        this.service = service;
    }
    async pagarBanco(banco, dto) {
        if (!banco) {
            throw new common_1.HttpException('Banco não especificado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.service.pagarBanco(banco, dto);
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async findAll() {
        return this.service.findAll();
    }
    async findOne(id) {
        return this.service.findOne(id);
    }
    async quitarMensalidade(mensalidadeId) {
        if (!mensalidadeId) {
            throw new common_1.HttpException('ID de mensalidade não informado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.service.quitarMensalidade(mensalidadeId);
    }
    async gerarComprovante(id, res) {
        if (!id) {
            throw new common_1.HttpException('ID não informado', common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = await this.service.gerarComprovanteMock(id);
        res.setHeader('Content-Type', 'application/pdf');
        res.status(common_1.HttpStatus.OK).send(payload);
    }
};
exports.PagamentosController = PagamentosController;
__decorate([
    (0, common_1.Post)('banco/:banco'),
    (0, swagger_1.ApiOperation)({ summary: 'Gerar cobrança via PSP/Banco' }),
    (0, swagger_1.ApiParam)({ name: 'banco', example: 'bb', description: 'Identificador do banco/PSP' }),
    (0, swagger_1.ApiBody)({ type: create_pagamento_dto_1.CreatePagamentoDto }),
    __param(0, (0, common_1.Param)('banco')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_pagamento_dto_1.CreatePagamentoDto]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "pagarBanco", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar pagamento manual (sem PSP)' }),
    (0, swagger_1.ApiBody)({ type: create_pagamento_dto_1.CreatePagamentoDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pagamento_dto_1.CreatePagamentoDto]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os pagamentos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhar pagamento por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'uuid-pagamento' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('mensalidade/:mensalidadeId/quitar'),
    (0, swagger_1.ApiOperation)({ summary: 'Marcar mensalidade como paga' }),
    (0, swagger_1.ApiParam)({ name: 'mensalidadeId', example: 'uuid-mensalidade' }),
    __param(0, (0, common_1.Param)('mensalidadeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "quitarMensalidade", null);
__decorate([
    (0, common_1.Get)(':id/comprovante'),
    (0, swagger_1.ApiOperation)({ summary: 'Gerar comprovante em PDF (mock)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'uuid-pagamento' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "gerarComprovante", null);
exports.PagamentosController = PagamentosController = __decorate([
    (0, swagger_1.ApiTags)('Pagamentos'),
    (0, common_1.Controller)('pagamentos'),
    __metadata("design:paramtypes", [pagamentos_service_1.PagamentosService])
], PagamentosController);

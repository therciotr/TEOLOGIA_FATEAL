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
exports.ResponsaveisController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const responsaveis_service_1 = require("./responsaveis.service");
const create_responsavel_dto_1 = require("./dto/create-responsavel.dto");
const update_responsavel_dto_1 = require("./dto/update-responsavel.dto");
let ResponsaveisController = class ResponsaveisController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        if (!id) {
            throw new common_1.HttpException('ID não informado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.service.findOne(id);
    }
    update(id, dto) {
        if (!id) {
            throw new common_1.HttpException('ID não informado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.service.update(id, dto);
    }
    remove(id) {
        if (!id) {
            throw new common_1.HttpException('ID não informado', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.service.remove(id);
    }
};
exports.ResponsaveisController = ResponsaveisController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo responsável' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Responsável criado com sucesso' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Dados inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_responsavel_dto_1.CreateResponsavelDto]),
    __metadata("design:returntype", void 0)
], ResponsaveisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os responsáveis' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista recuperada com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResponsaveisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar responsável por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do responsável' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Responsável encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResponsaveisController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar dados de um responsável' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do responsável a atualizar' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Responsável atualizado com sucesso' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_responsavel_dto_1.UpdateResponsavelDto]),
    __metadata("design:returntype", void 0)
], ResponsaveisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover um responsável' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do responsável a remover' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Responsável removido com sucesso' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResponsaveisController.prototype, "remove", null);
exports.ResponsaveisController = ResponsaveisController = __decorate([
    (0, swagger_1.ApiTags)('Responsáveis'),
    (0, common_1.Controller)('responsaveis'),
    __metadata("design:paramtypes", [responsaveis_service_1.ResponsaveisService])
], ResponsaveisController);

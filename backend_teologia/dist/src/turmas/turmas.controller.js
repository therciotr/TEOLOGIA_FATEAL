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
exports.TurmasController = void 0;
const common_1 = require("@nestjs/common");
const turmas_service_1 = require("./turmas.service");
const create_turma_dto_1 = require("./dto/create-turma.dto");
const update_turma_dto_1 = require("./dto/update-turma.dto");
const swagger_1 = require("@nestjs/swagger");
let TurmasController = class TurmasController {
    constructor(turmasService) {
        this.turmasService = turmasService;
    }
    findAll() {
        return this.turmasService.findAll();
    }
    findOne(id) {
        return this.turmasService.findOne(id);
    }
    create(createTurmaDto) {
        return this.turmasService.create(createTurmaDto);
    }
    update(id, updateTurmaDto) {
        return this.turmasService.update(id, updateTurmaDto);
    }
    remove(id) {
        return this.turmasService.remove(id);
    }
};
exports.TurmasController = TurmasController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as turmas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista retornada com sucesso.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TurmasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar uma turma por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turma encontrada.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Turma não encontrada.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TurmasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova turma' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Turma criada com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_turma_dto_1.CreateTurmaDto]),
    __metadata("design:returntype", void 0)
], TurmasController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar dados de uma turma' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turma atualizada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Turma não encontrada.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_turma_dto_1.UpdateTurmaDto]),
    __metadata("design:returntype", void 0)
], TurmasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover uma turma por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turma removida com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Turma não encontrada.' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TurmasController.prototype, "remove", null);
exports.TurmasController = TurmasController = __decorate([
    (0, swagger_1.ApiTags)('Turmas'),
    (0, common_1.Controller)('turmas'),
    __metadata("design:paramtypes", [turmas_service_1.TurmasService])
], TurmasController);

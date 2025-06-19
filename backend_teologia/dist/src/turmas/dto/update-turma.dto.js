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
exports.UpdateTurmaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_turma_dto_1 = require("./create-turma.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateTurmaDto extends (0, swagger_1.PartialType)(create_turma_dto_1.CreateTurmaDto) {
}
exports.UpdateTurmaDto = UpdateTurmaDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, swagger_2.ApiProperty)({
        example: 'Nova Turma A',
        required: false,
        description: 'Nome atualizado da turma (opcional)',
    }),
    __metadata("design:type", String)
], UpdateTurmaDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'O planoId deve ser um UUID válido.' }),
    (0, swagger_2.ApiProperty)({
        example: 'f1a447c1-5e2e-4f2a-a24a-d7814bd7e999',
        required: false,
        description: 'Novo ID do plano vinculado (UUID, opcional)',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], UpdateTurmaDto.prototype, "planoId", void 0);

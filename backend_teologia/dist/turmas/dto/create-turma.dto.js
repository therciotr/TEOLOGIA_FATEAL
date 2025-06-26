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
exports.CreateTurmaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTurmaDto {
}
exports.CreateTurmaDto = CreateTurmaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome da turma é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, swagger_1.ApiProperty)({
        example: 'Turma A - Teologia Básica',
        description: 'Nome identificador da turma',
    }),
    __metadata("design:type", String)
], CreateTurmaDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O ID do plano é obrigatório.' }),
    (0, class_validator_1.IsUUID)('4', { message: 'O planoId deve ser um UUID válido.' }),
    (0, swagger_1.ApiProperty)({
        example: 'a8a167c3-2b5a-4e57-bb78-10b60ec8ef00',
        description: 'UUID do plano financeiro associado à turma',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], CreateTurmaDto.prototype, "planoId", void 0);

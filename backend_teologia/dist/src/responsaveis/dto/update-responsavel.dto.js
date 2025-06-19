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
exports.UpdateResponsavelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_responsavel_dto_1 = require("./create-responsavel.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateResponsavelDto extends (0, swagger_1.PartialType)(create_responsavel_dto_1.CreateResponsavelDto) {
}
exports.UpdateResponsavelDto = UpdateResponsavelDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Nome não pode ultrapassar 100 caracteres' }),
    (0, swagger_2.ApiProperty)({
        example: 'Maria de Souza',
        required: false,
        description: 'Nome completo atualizado do responsável',
        maxLength: 100,
    }),
    __metadata("design:type", String)
], UpdateResponsavelDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido' }),
    (0, class_validator_1.MaxLength)(100, { message: 'E-mail não pode ultrapassar 100 caracteres' }),
    (0, swagger_2.ApiProperty)({
        example: 'maria@novaempresa.com',
        required: false,
        description: 'Novo e-mail válido do responsável',
        maxLength: 100,
    }),
    __metadata("design:type", String)
], UpdateResponsavelDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+?\d{10,15}$/, {
        message: 'Telefone deve estar no formato +5511999999999 (10 a 15 dígitos)',
    }),
    (0, swagger_2.ApiProperty)({
        example: '+5582988889999',
        required: false,
        description: 'Telefone atualizado (formato internacional com DDI)',
        minLength: 10,
        maxLength: 15,
    }),
    __metadata("design:type", String)
], UpdateResponsavelDto.prototype, "telefone", void 0);

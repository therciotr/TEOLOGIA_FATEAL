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
exports.UpdatePlanoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_plano_dto_1 = require("./create-plano.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdatePlanoDto extends (0, swagger_1.PartialType)(create_plano_dto_1.CreatePlanoDto) {
}
exports.UpdatePlanoDto = UpdatePlanoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_2.ApiProperty)({
        example: 'Plano Premium',
        required: false,
        description: 'Nome atualizado do plano (opcional)',
    }),
    __metadata("design:type", String)
], UpdatePlanoDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, swagger_2.ApiProperty)({
        example: 250.0,
        required: false,
        description: 'Novo valor do plano (opcional)',
        minimum: 0.01,
    }),
    __metadata("design:type", Number)
], UpdatePlanoDto.prototype, "valorPadrao", void 0);

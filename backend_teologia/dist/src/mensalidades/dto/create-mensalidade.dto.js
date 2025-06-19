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
exports.CreateMensalidadeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateMensalidadeDto {
}
exports.CreateMensalidadeDto = CreateMensalidadeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'f3b1f4e3-4c2d-42d7-91e3-8e3b3b2e7231',
        description: 'ID do aluno vinculado',
    }),
    __metadata("design:type", String)
], CreateMensalidadeDto.prototype, "alunoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: 100.5,
        description: 'Valor da mensalidade',
    }),
    __metadata("design:type", Number)
], CreateMensalidadeDto.prototype, "valor", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        example: '2025-06-01',
        description: 'Data de vencimento da mensalidade (formato ISO)',
    }),
    __metadata("design:type", String)
], CreateMensalidadeDto.prototype, "vencimento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.MensalidadeStatus, {
        message: `Status deve ser um dos seguintes: ${Object.values(client_1.MensalidadeStatus).join(', ')}`,
    }),
    (0, swagger_1.ApiProperty)({
        example: 'pendente',
        required: false,
        enum: client_1.MensalidadeStatus,
        description: 'Status da mensalidade (default: pendente)',
    }),
    __metadata("design:type", String)
], CreateMensalidadeDto.prototype, "status", void 0);

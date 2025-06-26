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
exports.UpdateMensalidadeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_mensalidade_dto_1 = require("./create-mensalidade.dto");
const client_1 = require("@prisma/client");
class UpdateMensalidadeDto extends (0, swagger_1.PartialType)(create_mensalidade_dto_1.CreateMensalidadeDto) {
}
exports.UpdateMensalidadeDto = UpdateMensalidadeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: 150.0,
        required: false,
        description: 'Novo valor da mensalidade',
    }),
    __metadata("design:type", Number)
], UpdateMensalidadeDto.prototype, "valor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        example: '2025-06-30',
        required: false,
        description: 'Nova data de vencimento (formato ISO)',
    }),
    __metadata("design:type", String)
], UpdateMensalidadeDto.prototype, "vencimento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.MensalidadeStatus, {
        message: `Status deve ser um dos seguintes: ${Object.values(client_1.MensalidadeStatus).join(', ')}`,
    }),
    (0, swagger_1.ApiProperty)({
        example: 'pago',
        required: false,
        enum: client_1.MensalidadeStatus,
        description: 'Novo status da mensalidade',
    }),
    __metadata("design:type", String)
], UpdateMensalidadeDto.prototype, "status", void 0);

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
exports.CreatePagamentoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreatePagamentoDto {
}
exports.CreatePagamentoDto = CreatePagamentoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiProperty)({
        example: 'e59f28e3-7a10-4cc9-a404-e83e2e882d3b',
        description: 'ID da mensalidade vinculada ao pagamento',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], CreatePagamentoDto.prototype, "mensalidadeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Valor deve ter no máximo 2 casas decimais' }),
    (0, class_validator_1.Min)(0.01, { message: 'Valor mínimo deve ser 0.01' }),
    (0, swagger_1.ApiProperty)({
        example: 100.5,
        description: 'Valor pago pelo aluno',
        minimum: 0.01,
    }),
    __metadata("design:type", Number)
], CreatePagamentoDto.prototype, "valorPago", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        example: '2025-06-10',
        description: 'Data em que o pagamento foi efetuado (ISO 8601). Se omitido, será gerada automaticamente.',
        format: 'date',
        required: false,
    }),
    __metadata("design:type", String)
], CreatePagamentoDto.prototype, "dataPagamento", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(client_1.MetodoPagamento, {
        message: `Método deve ser um dos seguintes: ${Object.values(client_1.MetodoPagamento).join(', ')}`,
    }),
    (0, swagger_1.ApiProperty)({
        example: client_1.MetodoPagamento.pix,
        enum: client_1.MetodoPagamento,
        description: 'Método utilizado no pagamento',
    }),
    __metadata("design:type", String)
], CreatePagamentoDto.prototype, "metodo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'Pagamento via Pix com desconto',
        description: 'Observações adicionais sobre o pagamento',
        required: false,
    }),
    __metadata("design:type", String)
], CreatePagamentoDto.prototype, "observacao", void 0);

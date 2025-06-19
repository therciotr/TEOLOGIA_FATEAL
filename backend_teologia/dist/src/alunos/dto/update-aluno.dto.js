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
exports.UpdateAlunoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_aluno_dto_1 = require("./create-aluno.dto");
class UpdateAlunoDto extends (0, swagger_1.PartialType)(create_aluno_dto_1.CreateAlunoDto) {
}
exports.UpdateAlunoDto = UpdateAlunoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'Rua das Palmeiras, 321',
        description: 'Endereço atualizado do aluno',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateAlunoDto.prototype, "endereco", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{7,14}$/, {
        message: 'RG deve conter apenas números (7-14 dígitos)',
    }),
    (0, swagger_1.ApiProperty)({
        example: '98765432',
        description: 'Número do RG atualizado do aluno',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateAlunoDto.prototype, "rg", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{11}$/, {
        message: 'CPF deve conter exatamente 11 dígitos',
    }),
    (0, swagger_1.ApiProperty)({
        example: '98765432100',
        description: 'Número do CPF (11 dígitos)',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateAlunoDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Matrícula paga (true) ou pendente (false)',
        required: false,
    }),
    __metadata("design:type", Boolean)
], UpdateAlunoDto.prototype, "matriculaPaga", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Novo arquivo da foto 3x4 (multipart/form-data)',
        type: 'string',
        format: 'binary',
        required: false,
    }),
    __metadata("design:type", Object)
], UpdateAlunoDto.prototype, "foto3x4", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayMaxSize)(10),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_aluno_dto_1.DocumentoDto),
    (0, swagger_1.ApiProperty)({
        description: 'Lista de documentos atualizados',
        type: [create_aluno_dto_1.DocumentoDto],
        required: false,
    }),
    __metadata("design:type", Array)
], UpdateAlunoDto.prototype, "documentos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(undefined, { message: 'URL inválida' }),
    (0, swagger_1.ApiProperty)({
        example: '/uploads/fotos/joao_nova.jpg',
        description: 'URL final da nova foto (gerado pelo backend)',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateAlunoDto.prototype, "fotoUrl", void 0);

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
exports.CreateAlunoDto = exports.DocumentoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class DocumentoDto {
}
exports.DocumentoDto = DocumentoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Historico_Escolar.pdf', description: 'Nome do arquivo' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentoDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL pública ou caminho interno onde o arquivo foi salvo',
        example: '/uploads/docs/historico.pdf',
    }),
    (0, class_validator_1.IsUrl)(undefined, { message: 'URL inválida para documento' }),
    __metadata("design:type", String)
], DocumentoDto.prototype, "url", void 0);
class CreateAlunoDto {
    constructor() {
        this.matriculaPaga = false;
    }
}
exports.CreateAlunoDto = CreateAlunoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'João da Silva', description: 'Nome completo do aluno' }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ example: 'joao@email.com', description: 'E-mail único' }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\+?\d{10,15}$/, {
        message: 'Telefone deve estar no formato +5582999999999',
    }),
    (0, swagger_1.ApiProperty)({
        example: '+5582988887777',
        required: false,
        description: 'Telefone em formato internacional',
    }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        example: '1990-05-10',
        required: false,
        description: 'Data de nascimento (YYYY-MM-DD)',
    }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "dataNascimento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'Rua das Flores, 123',
        required: false,
        description: 'Endereço completo',
    }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "endereco", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{7,14}$/, {
        message: 'RG deve conter apenas números (7-14 dígitos)',
    }),
    (0, swagger_1.ApiProperty)({
        example: '12345678',
        required: false,
        description: 'Número do RG',
    }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "rg", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{11}$/, {
        message: 'CPF deve conter exatamente 11 dígitos',
    }),
    (0, swagger_1.ApiProperty)({
        example: '12345678901',
        required: false,
        description: 'Número do CPF (11 dígitos)',
    }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'id-da-turma',
        required: false,
        description: 'ID da turma à qual o aluno pertence',
    }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "turmaId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Arquivo da foto 3x4 (campo multipart/form-data)',
        type: 'string',
        format: 'binary',
        required: false,
    }),
    __metadata("design:type", Object)
], CreateAlunoDto.prototype, "foto3x4", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayMaxSize)(10, { message: 'Máximo de 10 documentos permitidos' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DocumentoDto),
    (0, swagger_1.ApiProperty)({
        description: 'Lista de documentos anexos',
        type: [DocumentoDto],
        required: false,
    }),
    __metadata("design:type", Array)
], CreateAlunoDto.prototype, "documentos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        example: false,
        required: false,
        description: 'Define se a matrícula já está quitada',
        default: false,
    }),
    __metadata("design:type", Boolean)
], CreateAlunoDto.prototype, "matriculaPaga", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(undefined, { message: 'URL inválida para foto' }),
    (0, swagger_1.ApiProperty)({
        example: '/uploads/fotos/foto_joao.jpg',
        required: false,
        description: 'URL final da foto 3x4 após upload',
    }),
    __metadata("design:type", String)
], CreateAlunoDto.prototype, "fotoUrl", void 0);

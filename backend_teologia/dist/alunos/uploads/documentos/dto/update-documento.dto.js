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
exports.UpdateDocumentoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_documento_dto_1 = require("./create-documento.dto");
const class_validator_1 = require("class-validator");
class UpdateDocumentoDto extends (0, swagger_1.PartialType)(create_documento_dto_1.CreateDocumentoDto) {
}
exports.UpdateDocumentoDto = UpdateDocumentoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'Contrato de matrícula',
        description: 'Nome atualizado do documento (opcional)',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateDocumentoDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\/?uploads\/documentos\/.+$/, {
        message: 'URL inválida. Deve começar com /uploads/documentos/ e conter o nome do arquivo.',
    }),
    (0, swagger_1.ApiProperty)({
        example: '/uploads/documentos/contrato-matricula.pdf',
        description: 'Caminho/URL atualizado do arquivo (opcional)',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateDocumentoDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'uuid-do-aluno',
        description: 'ID do aluno vinculado (opcional)',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateDocumentoDto.prototype, "alunoId", void 0);

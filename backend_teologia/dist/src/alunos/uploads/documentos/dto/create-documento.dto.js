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
exports.CreateDocumentoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDocumentoDto {
}
exports.CreateDocumentoDto = CreateDocumentoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Certidão de Nascimento',
        description: 'Nome do documento enviado pelo aluno',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentoDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/uploads/documentos/doc1.pdf',
        description: 'Caminho público ou URL do arquivo salvo',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\/?uploads\/documentos\/.+$/, {
        message: 'URL inválida. Deve começar com /uploads/documentos/ e conter o nome do arquivo.',
    }),
    __metadata("design:type", String)
], CreateDocumentoDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'aluno-uuid-123',
        description: 'ID do aluno vinculado ao documento',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentoDto.prototype, "alunoId", void 0);

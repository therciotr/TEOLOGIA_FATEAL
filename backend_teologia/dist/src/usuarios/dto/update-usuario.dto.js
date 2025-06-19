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
exports.UpdateUsuarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_usuario_dto_1 = require("./create-usuario.dto");
const class_validator_1 = require("class-validator");
class UpdateUsuarioDto extends (0, swagger_1.PartialType)(create_usuario_dto_1.CreateUsuarioDto) {
}
exports.UpdateUsuarioDto = UpdateUsuarioDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'João Atualizado',
        required: false,
        description: 'Nome atualizado do usuário',
    }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        example: 'joao.novo@email.com',
        required: false,
        description: 'Novo e-mail do usuário',
    }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'A nova senha deve ter no mínimo 6 caracteres' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
        message: 'A senha deve conter letras e números',
    }),
    (0, swagger_1.ApiProperty)({
        example: 'NovaSenha123',
        required: false,
        description: 'Nova senha segura com letras e números',
    }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['admin', 'coordenador', 'aluno'], {
        message: 'Perfil deve ser admin, coordenador ou aluno',
    }),
    (0, swagger_1.ApiProperty)({
        example: 'coordenador',
        required: false,
        description: 'Novo perfil de acesso do usuário',
        enum: ['admin', 'coordenador', 'aluno'],
    }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "perfil", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        example: true,
        required: false,
        description: 'Status de ativação do usuário (ativo/inativo)',
    }),
    __metadata("design:type", Boolean)
], UpdateUsuarioDto.prototype, "ativo", void 0);

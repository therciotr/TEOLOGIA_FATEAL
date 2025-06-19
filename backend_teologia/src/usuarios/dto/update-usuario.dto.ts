// src/usuarios/dto/update-usuario.dto.ts
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsOptional, IsString, IsBoolean, IsEmail, MinLength, Matches, IsIn } from 'class-validator';

/**
 * DTO para atualização parcial de um usuário.
 * Herda os campos de CreateUsuarioDto como opcionais.
 */
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'João Atualizado',
    required: false,
    description: 'Nome atualizado do usuário',
  })
  nome?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'joao.novo@email.com',
    required: false,
    description: 'Novo e-mail do usuário',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'A nova senha deve ter no mínimo 6 caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'A senha deve conter letras e números',
  })
  @ApiProperty({
    example: 'NovaSenha123',
    required: false,
    description: 'Nova senha segura com letras e números',
  })
  senha?: string;

  @IsOptional()
  @IsString()
  @IsIn(['admin', 'coordenador', 'aluno'], {
    message: 'Perfil deve ser admin, coordenador ou aluno',
  })
  @ApiProperty({
    example: 'coordenador',
    required: false,
    description: 'Novo perfil de acesso do usuário',
    enum: ['admin', 'coordenador', 'aluno'],
  })
  perfil?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    required: false,
    description: 'Status de ativação do usuário (ativo/inativo)',
  })
  ativo?: boolean;
}
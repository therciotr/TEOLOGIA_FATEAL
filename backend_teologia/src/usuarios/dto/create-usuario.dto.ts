// src/usuarios/dto/create-usuario.dto.ts
import { IsNotEmpty, IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de um usuário no sistema.
 */
export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do usuário',
  })
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail único do usuário (usado para login)',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'A senha deve conter letras e números',
  })
  @ApiProperty({
    example: 'Senha123',
    description: 'Senha segura com pelo menos 6 caracteres, incluindo letras e números',
  })
  senha: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'Perfil de acesso do usuário (ex: admin, coordenador, aluno)',
    enum: ['admin', 'coordenador', 'aluno'], // você pode ajustar conforme os perfis válidos no seu sistema
  })
  perfil: string;
}
// src/usuarios/dto/create-usuario.dto.ts
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de usuário no sistema.
 */
export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'Nome do usuário',
  })
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'admin@email.com',
    description: 'E-mail do usuário (usado para login)',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'senhaSegura123',
    description: 'Senha do usuário (será criptografada)',
  })
  senha: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'Perfil de acesso (ex: admin, coordenador, aluno)',
  })
  perfil: string;
}
// src/usuarios/dto/create-usuario.dto.ts
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'admin@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'senhaSegura123' })
  senha: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  perfil: string;
}
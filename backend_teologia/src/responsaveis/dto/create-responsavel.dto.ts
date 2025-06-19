// src/responsaveis/dto/create-responsavel.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

/**
 * DTO para criação de um responsável.
 */
export class CreateResponsavelDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'Nome não pode ultrapassar 100 caracteres' })
  @ApiProperty({
    example: 'Maria Silva',
    description: 'Nome completo do responsável',
    maxLength: 100,
  })
  nome!: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido' })
  @MaxLength(100, { message: 'E-mail não pode ultrapassar 100 caracteres' })
  @ApiProperty({
    example: 'maria@email.com',
    description: 'E-mail único do responsável',
    maxLength: 100,
  })
  email!: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?\d{10,15}$/, {
    message: 'Telefone deve estar no formato +5511999999999 (10 a 15 dígitos)',
  })
  @ApiProperty({
    example: '+5582999999999',
    required: false,
    description: 'Telefone de contato (formato internacional com DDI)',
    minLength: 10,
    maxLength: 15,
  })
  telefone?: string;
}
// src/responsaveis/dto/update-responsavel.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateResponsavelDto } from './create-responsavel.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  Matches,
  MaxLength,
} from 'class-validator';

/**
 * DTO para atualização parcial de um responsável.
 * Todos os campos são opcionais.
 */
export class UpdateResponsavelDto extends PartialType(CreateResponsavelDto) {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Nome não pode ultrapassar 100 caracteres' })
  @ApiProperty({
    example: 'Maria de Souza',
    required: false,
    description: 'Nome completo atualizado do responsável',
    maxLength: 100,
  })
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  @MaxLength(100, { message: 'E-mail não pode ultrapassar 100 caracteres' })
  @ApiProperty({
    example: 'maria@novaempresa.com',
    required: false,
    description: 'Novo e-mail válido do responsável',
    maxLength: 100,
  })
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?\d{10,15}$/, {
    message: 'Telefone deve estar no formato +5511999999999 (10 a 15 dígitos)',
  })
  @ApiProperty({
    example: '+5582988889999',
    required: false,
    description: 'Telefone atualizado (formato internacional com DDI)',
    minLength: 10,
    maxLength: 15,
  })
  telefone?: string;
}
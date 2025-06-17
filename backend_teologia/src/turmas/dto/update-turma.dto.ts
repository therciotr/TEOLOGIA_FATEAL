// src/turmas/dto/update-turma.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateTurmaDto } from './create-turma.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO para atualização parcial dos dados de uma turma.
 * Estende os campos do CreateTurmaDto tornando-os opcionais.
 */
export class UpdateTurmaDto extends PartialType(CreateTurmaDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Nova Turma A',
    required: false,
    description: 'Nome atualizado da turma (opcional)',
  })
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'plano-id-uuid',
    required: false,
    description: 'Novo ID do plano vinculado (opcional)',
  })
  planoId?: string;
}
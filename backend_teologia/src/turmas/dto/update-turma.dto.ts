// src/turmas/dto/update-turma.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateTurmaDto } from './create-turma.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * DTO para atualização parcial dos dados de uma turma.
 * Estende os campos do CreateTurmaDto tornando-os opcionais.
 */
export class UpdateTurmaDto extends PartialType(CreateTurmaDto) {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  @ApiProperty({
    example: 'Nova Turma A',
    required: false,
    description: 'Nome atualizado da turma (opcional)',
  })
  nome?: string;

  @IsOptional()
  @IsUUID('4', { message: 'O planoId deve ser um UUID válido.' })
  @ApiProperty({
    example: 'f1a447c1-5e2e-4f2a-a24a-d7814bd7e999',
    required: false,
    description: 'Novo ID do plano vinculado (UUID, opcional)',
    format: 'uuid',
  })
  planoId?: string;
}
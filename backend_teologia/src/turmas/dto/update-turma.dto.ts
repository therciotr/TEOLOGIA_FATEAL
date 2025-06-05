// src/turmas/dto/update-turma.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateTurmaDto } from './create-turma.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTurmaDto extends PartialType(CreateTurmaDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Nova Turma A', required: false })
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'plano-id-uuid', required: false })
  planoId?: string;
}
// src/responsaveis/dto/update-responsavel.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateResponsavelDto } from './create-responsavel.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateResponsavelDto extends PartialType(CreateResponsavelDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Maria de Souza', required: false })
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'maria@email.com', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '99999-9999', required: false })
  telefone?: string;
}
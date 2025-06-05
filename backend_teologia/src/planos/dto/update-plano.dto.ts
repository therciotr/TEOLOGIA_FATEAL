// src/planos/dto/update-plano.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePlanoDto } from './create-plano.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePlanoDto extends PartialType(CreatePlanoDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Plano Premium', required: false })
  nome?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 250.0, required: false })
  valor?: number;
}
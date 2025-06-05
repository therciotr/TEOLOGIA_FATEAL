// src/mensalidades/dto/update-mensalidade.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateMensalidadeDto } from './create-mensalidade.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';

export class UpdateMensalidadeDto extends PartialType(CreateMensalidadeDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 150.0, required: false })
  valor?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2025-06-30', required: false })
  vencimento?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'pago', required: false })
  status?: string;
}
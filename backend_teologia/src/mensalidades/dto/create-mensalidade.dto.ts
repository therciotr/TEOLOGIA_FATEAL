// src/mensalidades/dto/create-mensalidade.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMensalidadeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'aluno-id' })
  alunoId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100.5 })
  valor: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2025-06-01' })
  vencimento: string;
}
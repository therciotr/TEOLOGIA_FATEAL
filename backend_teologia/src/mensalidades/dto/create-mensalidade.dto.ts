import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MensalidadeStatus } from '@prisma/client';

/**
 * DTO para criação de mensalidade.
 */
export class CreateMensalidadeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'f3b1f4e3-4c2d-42d7-91e3-8e3b3b2e7231',
    description: 'ID do aluno vinculado',
  })
  alunoId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100.5,
    description: 'Valor da mensalidade',
  })
  valor: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2025-06-01',
    description: 'Data de vencimento da mensalidade (formato ISO)',
  })
  vencimento: string;

  @IsOptional()
  @IsEnum(MensalidadeStatus, {
    message: `Status deve ser um dos seguintes: ${Object.values(MensalidadeStatus).join(', ')}`,
  })
  @ApiProperty({
    example: 'pendente',
    required: false,
    enum: MensalidadeStatus,
    description: 'Status da mensalidade (default: pendente)',
  })
  status?: MensalidadeStatus;
}
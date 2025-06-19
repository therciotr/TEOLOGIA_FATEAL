import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { CreateMensalidadeDto } from './create-mensalidade.dto';
import { MensalidadeStatus } from '@prisma/client';

/**
 * DTO para atualização de mensalidade.
 * Todos os campos são opcionais, herdados do DTO de criação.
 */
export class UpdateMensalidadeDto extends PartialType(CreateMensalidadeDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 150.0,
    required: false,
    description: 'Novo valor da mensalidade',
  })
  valor?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2025-06-30',
    required: false,
    description: 'Nova data de vencimento (formato ISO)',
  })
  vencimento?: string;

  @IsOptional()
  @IsEnum(MensalidadeStatus, {
    message: `Status deve ser um dos seguintes: ${Object.values(MensalidadeStatus).join(', ')}`,
  })
  @ApiProperty({
    example: 'pago',
    required: false,
    enum: MensalidadeStatus,
    description: 'Novo status da mensalidade',
  })
  status?: MensalidadeStatus;
}
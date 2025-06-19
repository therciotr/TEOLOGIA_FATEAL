// src/pagamentos/dto/update-pagamento.dto.ts

import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePagamentoDto } from './create-pagamento.dto';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  Min,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { MetodoPagamento } from '@prisma/client';

/**
 * DTO para atualização parcial de um pagamento.
 */
export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {
  @IsOptional()
  @IsUUID('4')
  @ApiProperty({
    example: 'e59f28e3-7a10-4cc9-a404-e83e2e882d3b',
    required: false,
    description: 'ID da mensalidade vinculada ao pagamento (opcional)',
    format: 'uuid',
  })
  mensalidadeId?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Valor deve ter no máximo 2 casas decimais' })
  @Min(0.01, { message: 'Valor mínimo deve ser 0.01' })
  @ApiProperty({
    example: 100.5,
    required: false,
    description: 'Valor pago (opcional)',
    minimum: 0.01,
  })
  valorPago?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2025-06-10',
    required: false,
    description: 'Data do pagamento (opcional)',
    format: 'date',
  })
  dataPagamento?: string;

  @IsOptional()
  @IsEnum(MetodoPagamento, {
    message: `Método deve ser um dos seguintes: ${Object.values(MetodoPagamento).join(', ')}`,
  })
  @ApiProperty({
    example: MetodoPagamento.pix,
    required: false,
    enum: MetodoPagamento,
    description: 'Método de pagamento (opcional)',
  })
  metodo?: MetodoPagamento;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Pagamento via Pix com desconto',
    required: false,
    description: 'Observações adicionais (opcional)',
  })
  observacao?: string;
}
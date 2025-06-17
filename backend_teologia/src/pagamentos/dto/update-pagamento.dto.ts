// src/pagamentos/dto/update-pagamento.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreatePagamentoDto } from './create-pagamento.dto';
import { IsOptional, IsString, IsNumber, IsDateString, Min, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para atualização parcial de um pagamento.
 */
export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'e59f28e3-7a10-4cc9-a404-e83e2e882d3b',
    required: false,
    description: 'ID da mensalidade vinculada ao pagamento (opcional)',
  })
  mensalidadeId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
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
  @IsString()
  @IsIn(['pix', 'dinheiro', 'boleto', 'cartao'])
  @ApiProperty({
    example: 'pix',
    required: false,
    description: 'Método de pagamento (opcional)',
    enum: ['pix', 'dinheiro', 'boleto', 'cartao'],
  })
  metodo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Pagamento via Pix com desconto',
    required: false,
    description: 'Observações adicionais (opcional)',
  })
  observacao?: string;
}
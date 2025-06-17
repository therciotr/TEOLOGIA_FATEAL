// src/pagamentos/dto/create-pagamento.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, Min, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de um pagamento.
 */
export class CreatePagamentoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'e59f28e3-7a10-4cc9-a404-e83e2e882d3b',
    description: 'ID da mensalidade vinculada ao pagamento',
  })
  mensalidadeId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @ApiProperty({
    example: 100.5,
    description: 'Valor pago pelo aluno',
    minimum: 0.01,
  })
  valorPago: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2025-06-10',
    description: 'Data em que o pagamento foi efetuado',
    format: 'date',
  })
  dataPagamento: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['pix', 'dinheiro', 'boleto', 'cartao'])
  @ApiProperty({
    example: 'pix',
    description: 'Método utilizado no pagamento',
    enum: ['pix', 'dinheiro', 'boleto', 'cartao'],
  })
  metodo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Pagamento via Pix com desconto',
    description: 'Observações adicionais sobre o pagamento',
    required: false,
  })
  observacao?: string;
}
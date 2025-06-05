// src/pagamentos/dto/create-pagamento.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de um pagamento.
 */
export class CreatePagamentoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'mensalidade-id', description: 'ID da mensalidade vinculada ao pagamento' })
  mensalidadeId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100.5, description: 'Valor pago' })
  valorPago: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2025-06-10', description: 'Data do pagamento' })
  dataPagamento: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'pix', description: 'Método de pagamento' })
  metodo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Pagamento via Pix com desconto', required: false, description: 'Observações adicionais do pagamento' })
  observacao?: string;
}
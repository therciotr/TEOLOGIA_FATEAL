// src/pagamentos/dto/update-pagamento.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePagamentoDto } from './create-pagamento.dto';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para atualização parcial de um pagamento.
 * Baseado no CreatePagamentoDto, mas todos os campos são opcionais.
 */
export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'mensalidade-id', required: false, description: 'ID da mensalidade vinculada ao pagamento (opcional)' })
  mensalidadeId?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 100.5, required: false, description: 'Valor pago (opcional)' })
  valorPago?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2025-06-10', required: false, description: 'Data do pagamento (opcional)' })
  dataPagamento?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'pix', required: false, description: 'Método de pagamento (opcional)' })
  metodo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Pagamento via Pix com desconto', required: false, description: 'Observações adicionais (opcional)' })
  observacao?: string;
}
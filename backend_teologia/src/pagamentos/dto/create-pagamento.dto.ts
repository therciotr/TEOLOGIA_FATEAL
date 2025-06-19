// src/pagamentos/dto/create-pagamento.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  Min,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MetodoPagamento } from '@prisma/client';

/**
 * DTO para criação de um pagamento.
 */
export class CreatePagamentoDto {
  /* ─────────── Relacionamento ─────────── */
  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty({
    example: 'e59f28e3-7a10-4cc9-a404-e83e2e882d3b',
    description: 'ID da mensalidade vinculada ao pagamento',
    format: 'uuid',
  })
  mensalidadeId!: string;

  /* ─────────── Valor pago ─────────── */
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Valor deve ter no máximo 2 casas decimais' })
  @Min(0.01, { message: 'Valor mínimo deve ser 0.01' })
  @ApiProperty({
    example: 100.5,
    description: 'Valor pago pelo aluno',
    minimum: 0.01,
  })
  valorPago!: number;

  /* ─────────── Data do pagamento ─────────── */
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2025-06-10',
    description:
      'Data em que o pagamento foi efetuado (ISO 8601). Se omitido, será gerada automaticamente.',
    format: 'date',
    required: false,
  })
  dataPagamento?: string;

  /* ─────────── Método de pagamento ─────────── */
  @IsNotEmpty()
  @IsEnum(MetodoPagamento, {
    message: `Método deve ser um dos seguintes: ${Object.values(MetodoPagamento).join(', ')}`,
  })
  @ApiProperty({
    example: MetodoPagamento.pix,
    enum: MetodoPagamento,
    description: 'Método utilizado no pagamento',
  })
  metodo!: MetodoPagamento;

  /* ─────────── Observação opcional ─────────── */
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Pagamento via Pix com desconto',
    description: 'Observações adicionais sobre o pagamento',
    required: false,
  })
  observacao?: string;
}
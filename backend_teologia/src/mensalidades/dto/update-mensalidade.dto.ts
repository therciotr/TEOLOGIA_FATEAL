// src/mensalidades/dto/update-mensalidade.dto.ts

import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateMensalidadeDto } from './create-mensalidade.dto';

/**
 * DTO para atualização de mensalidade.
 * Usa PartialType para tornar todos os campos opcionais.
 */
export class UpdateMensalidadeDto extends PartialType(CreateMensalidadeDto) {
  @ApiProperty({ example: 150.0, required: false, description: 'Novo valor da mensalidade' })
  valor?: number;

  @ApiProperty({ example: '2025-06-30', required: false, description: 'Nova data de vencimento (ISO)' })
  vencimento?: string;

  @ApiProperty({ example: 'pago', required: false, description: 'Novo status da mensalidade' })
  status?: string;
}
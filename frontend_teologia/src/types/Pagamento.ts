/**
 * Representa um pagamento efetuado.
 */
export interface Pagamento {
  id: string;               // Identificador único
  mensalidadeId: string;    // ID da mensalidade associada
  data_pagamento: string;   // Data do pagamento (YYYY-MM-DD)
  valor_pago: number;       // Valor pago
  metodo: string;           // Método de pagamento (PIX, boleto, etc.)
}
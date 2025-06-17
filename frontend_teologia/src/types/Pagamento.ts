/**
 * Representa um pagamento efetuado pelo aluno referente a uma mensalidade.
 */
export interface Pagamento {
  id: string;                        // Identificador único do pagamento
  mensalidadeId: string;            // Referência à mensalidade paga
  dataPagamento: string;            // Data do pagamento (ISO: "YYYY-MM-DD")
  valorPago: number;                // Valor que foi efetivamente pago
  metodo: "PIX" | "boleto" | "dinheiro" | "cartao" | "transferencia"; // Método utilizado
  observacao?: string;              // Observações adicionais (opcional)
  comprovanteUrl?: string;          // Link para o comprovante de pagamento (se houver)
  criadoEm?: string;                // Timestamp de criação
  atualizadoEm?: string;            // Timestamp de última modificação
}
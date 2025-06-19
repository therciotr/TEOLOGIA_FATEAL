/**
 * Representa uma mensalidade vinculada a um aluno.
 */
export interface Mensalidade {
  id: number;                         // Identificador único da mensalidade
  alunoId: number;                    // ID do aluno associado
  valor: number;                      // Valor monetário da mensalidade
  dataVencimento: string;            // Data de vencimento (ISO: "YYYY-MM-DD")
  dataPagamento?: string | null;     // Data de pagamento, se houver (ISO)
  status: "pago" | "pendente" | "atrasado"; // Status atual da mensalidade
  observacao?: string;               // Campo opcional para observações manuais
  criadoEm?: string;                 // Data de criação (ISO)
  atualizadoEm?: string;             // Data da última modificação (ISO)
}
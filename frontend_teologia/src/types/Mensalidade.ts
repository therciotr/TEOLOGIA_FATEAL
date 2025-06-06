// src/types/Mensalidade.ts

export interface Mensalidade {
  id: number;            // ID único da mensalidade
  alunoId: number;       // ID do aluno
  valor: number;         // Valor da mensalidade
  dataVencimento: string; // Data de vencimento (ex: "2025-06-01")
  dataPagamento?: string; // Data de pagamento, se já pago (opcional)
  status: "pago" | "pendente" | "atrasado"; // Status do pagamento
}
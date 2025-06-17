/**
 * Representa um plano de estudo disponível para alunos.
 */
export interface Plano {
  id: string;               // Identificador único do plano
  nome: string;             // Nome do plano (ex: "Plano Básico", "Intensivo")
  valor: number;            // Valor do plano em reais
  descricao?: string;       // Descrição detalhada do que inclui (opcional)
  duracaoMeses?: number;    // Duração do plano em meses (opcional)
  ativo?: boolean;          // Indica se o plano está ativo (default: true)
  criadoEm?: string;        // Timestamp de criação (ISO)
  atualizadoEm?: string;    // Timestamp da última atualização
}
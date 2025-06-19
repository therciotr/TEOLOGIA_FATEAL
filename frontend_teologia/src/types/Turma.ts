/**
 * Representa uma turma de estudo.
 */
export interface Turma {
  id: string;              // Identificador único da turma
  nome: string;            // Nome da turma
  planoId?: string;        // ID do plano de estudo associado (opcional)
  descricao?: string;      // Descrição breve da turma (opcional)
  anoLetivo?: string;      // Ano letivo (ex: "2025")
  turno?: "manhã" | "tarde" | "noite"; // Turno da turma (opcional)
  status?: "ativa" | "inativa"; // Status da turma (controle de exibição)
  criadoEm?: string;       // Data de criação (ISO)
  atualizadoEm?: string;   // Última atualização (ISO)
}
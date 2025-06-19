/**
 * Representa um professor da instituição.
 */
export interface Professor {
  id: number;                 // ID único do professor
  nome: string;               // Nome completo
  email: string;              // E-mail de contato institucional
  telefone?: string;          // Telefone (opcional)
  disciplina: string;         // Disciplina principal que leciona
  outrasDisciplinas?: string[]; // Outras disciplinas atribuídas (opcional)
  dataContratacao: string;    // Data de contratação (ex: "2023-01-01")
  status: "ativo" | "inativo"; // Status atual
  fotoUrl?: string;           // URL para a foto de perfil (opcional)
  criadoEm?: string;          // Data de criação (timestamp ISO)
  atualizadoEm?: string;      // Última atualização (timestamp ISO)
}
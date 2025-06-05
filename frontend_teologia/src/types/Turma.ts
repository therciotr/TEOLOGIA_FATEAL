/**
 * Representa uma turma de estudo.
 */
export interface Turma {
  id: string;           // Identificador único
  nome: string;         // Nome da turma
  planoId?: string;     // Plano associado (opcional)
}
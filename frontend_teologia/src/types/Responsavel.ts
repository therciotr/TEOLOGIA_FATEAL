/**
 * Representa um responsável cadastrado.
 */
export interface Responsavel {
  id: string;          // Identificador único
  nome: string;        // Nome completo
  email: string;       // E-mail de contato
  telefone?: string;   // Telefone de contato (opcional)
}
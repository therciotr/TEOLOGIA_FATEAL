/**
 * Representa um responsável cadastrado no sistema.
 */
export interface Responsavel {
  id: string;              // Identificador único
  nome: string;            // Nome completo
  email: string;           // E-mail de contato
  telefone?: string;       // Telefone de contato (opcional)
  cpf?: string;            // CPF do responsável (opcional)
  grauParentesco?: string; // Grau de parentesco com o aluno (ex: Pai, Mãe)
  endereco?: string;       // Endereço residencial (opcional)
  criadoEm?: string;       // Data de criação do cadastro
  atualizadoEm?: string;   // Data da última atualização
}
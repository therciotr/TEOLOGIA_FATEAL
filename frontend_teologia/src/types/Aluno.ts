import { Documento } from "./Documento";

/**
 * Representa um aluno cadastrado no sistema.
 */
export interface Aluno {
  id: string;                    // Identificador único do aluno
  nome: string;                  // Nome completo
  email: string;                 // E-mail do aluno
  telefone?: string;            // Telefone de contato (opcional)
  endereco?: string;            // Endereço residencial (opcional)
  rg?: string;                  // Documento de identidade (opcional)
  turmaId?: string | null;      // ID da turma à qual pertence
  turmaNome?: string;           // Nome da turma (usado para exibição, se vier populado da API)
  fotoUrl?: string;             // URL da foto 3x4 do aluno
  matriculaPaga: boolean;       // Indica se a matrícula está paga
  documentos: Documento[];      // Documentos anexados (RG, CPF, etc.)
  criadoEm?: string;            // Timestamp de criação (ISO date string)
  atualizadoEm?: string;        // Timestamp da última atualização (ISO date string)
}
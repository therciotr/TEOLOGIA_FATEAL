import { Documento } from "./Documento";

/**
 * Representa um aluno cadastrado no sistema.
 */
export interface Aluno {
  id: string;                   // Identificador único
  nome: string;                 // Nome completo
  email: string;                // E-mail do aluno
  telefone?: string;            // Telefone de contato (opcional)
  endereco?: string;            // Endereço (opcional)
  rg?: string;                  // RG (opcional)
  turmaId?: string;             // ID da turma (opcional)
  fotoUrl?: string;             // Caminho da foto 3x4 (opcional)
  matriculaPaga: boolean;       // Status de matrícula paga
  documentos: Documento[];      // Lista de documentos anexados
}
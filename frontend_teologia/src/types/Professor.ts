// src/types/Professor.ts

export interface Professor {
  id: number;             // ID único do professor
  nome: string;           // Nome completo
  email: string;          // E-mail de contato
  telefone?: string;      // Telefone (opcional)
  disciplina: string;     // Disciplina que leciona
  dataContratacao: string; // Data de contratação (ex: "2023-01-01")
  status: "ativo" | "inativo"; // Status do professor
}
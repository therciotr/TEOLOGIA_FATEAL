// src/services/turmas.ts

import { api } from "./api";
import { Turma } from "@/types/Turma"; // ✅ Importa a tipagem real para turmas

/**
 * Busca todas as turmas cadastradas.
 * GET /turmas
 * @returns Lista de turmas.
 */
export const getTurmas = () =>
  api.get<Turma[]>("/turmas");

/**
 * Busca uma turma específica pelo ID.
 * GET /turmas/:id
 * @param id - ID da turma.
 * @returns Dados da turma.
 */
export const getTurma = (id: string) =>
  api.get<Turma>(`/turmas/${id}`);

/**
 * Cria uma nova turma.
 * POST /turmas
 * @param data - Dados parciais da turma.
 * @returns Turma criada.
 */
export const createTurma = (data: Partial<Turma>) =>
  api.post<Turma>("/turmas", data);

/**
 * Atualiza uma turma existente.
 * PUT /turmas/:id
 * @param id - ID da turma.
 * @param data - Dados atualizados.
 * @returns Turma atualizada.
 */
export const updateTurma = (id: string, data: Partial<Turma>) =>
  api.put<Turma>(`/turmas/${id}`, data);

/**
 * Remove uma turma pelo ID.
 * DELETE /turmas/:id
 * @param id - ID da turma.
 * @returns Confirmação da exclusão.
 */
export const deleteTurma = (id: string) =>
  api.delete(`/turmas/${id}`);
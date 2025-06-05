// src/services/mensalidades.ts

import { api } from "./api";
import { Mensalidade } from "@/types/Mensalidade"; // ✅ Importa a interface Mensalidade para tipagem

/**
 * Busca a lista de todas as mensalidades.
 * GET /mensalidades
 * @returns Lista de mensalidades.
 */
export const getMensalidades = () =>
  api.get<Mensalidade[]>("/mensalidades");

/**
 * Busca uma mensalidade específica pelo ID.
 * GET /mensalidades/:id
 * @param id - ID da mensalidade.
 * @returns Dados completos da mensalidade.
 */
export const getMensalidade = (id: string) =>
  api.get<Mensalidade>(`/mensalidades/${id}`);

/**
 * Cria uma nova mensalidade.
 * POST /mensalidades
 * @param data - Dados da mensalidade a serem criados.
 * @returns Mensalidade criada.
 */
export const createMensalidade = (data: Partial<Mensalidade>) =>
  api.post<Mensalidade>("/mensalidades", data);

/**
 * Atualiza uma mensalidade existente.
 * PUT /mensalidades/:id
 * @param id - ID da mensalidade.
 * @param data - Dados atualizados da mensalidade.
 * @returns Mensalidade atualizada.
 */
export const updateMensalidade = (id: string, data: Partial<Mensalidade>) =>
  api.put<Mensalidade>(`/mensalidades/${id}`, data);

/**
 * Remove uma mensalidade pelo ID.
 * DELETE /mensalidades/:id
 * @param id - ID da mensalidade.
 * @returns Confirmação da exclusão.
 */
export const deleteMensalidade = (id: string) =>
  api.delete(`/mensalidades/${id}`);
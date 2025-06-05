// src/services/planos.ts

import { api } from "./api";
import { Plano } from "@/types/Plano"; // ✅ Importa a tipagem real para planos

/**
 * Busca todos os planos cadastrados.
 * GET /planos
 * @returns Lista de planos.
 */
export const getPlanos = () =>
  api.get<Plano[]>("/planos");

/**
 * Busca um plano específico pelo ID.
 * GET /planos/:id
 * @param id - ID do plano.
 * @returns Dados do plano.
 */
export const getPlano = (id: string) =>
  api.get<Plano>(`/planos/${id}`);

/**
 * Cria um novo plano.
 * POST /planos
 * @param data - Dados parciais do plano.
 * @returns Plano criado.
 */
export const createPlano = (data: Partial<Plano>) =>
  api.post<Plano>("/planos", data);

/**
 * Atualiza um plano existente.
 * PUT /planos/:id
 * @param id - ID do plano.
 * @param data - Dados atualizados.
 * @returns Plano atualizado.
 */
export const updatePlano = (id: string, data: Partial<Plano>) =>
  api.put<Plano>(`/planos/${id}`, data);

/**
 * Remove um plano pelo ID.
 * DELETE /planos/:id
 * @param id - ID do plano.
 * @returns Confirmação da exclusão.
 */
export const deletePlano = (id: string) =>
  api.delete(`/planos/${id}`);
// src/services/responsaveis.ts

import { api } from "./api";
import { Responsavel } from "@/types/Responsavel"; // ✅ Importa a tipagem real

/**
 * Busca todos os responsáveis cadastrados.
 * GET /responsaveis
 * @returns Lista de responsáveis.
 */
export const getResponsaveis = () =>
  api.get<Responsavel[]>("/responsaveis");

/**
 * Busca um responsável específico pelo ID.
 * GET /responsaveis/:id
 * @param id - ID do responsável.
 * @returns Dados do responsável.
 */
export const getResponsavel = (id: string) =>
  api.get<Responsavel>(`/responsaveis/${id}`);

/**
 * Cria um novo responsável.
 * POST /responsaveis
 * @param data - Dados parciais do responsável.
 * @returns Responsável criado.
 */
export const createResponsavel = (data: Partial<Responsavel>) =>
  api.post<Responsavel>("/responsaveis", data);

/**
 * Atualiza um responsável existente.
 * PUT /responsaveis/:id
 * @param id - ID do responsável.
 * @param data - Dados atualizados.
 * @returns Responsável atualizado.
 */
export const updateResponsavel = (id: string, data: Partial<Responsavel>) =>
  api.put<Responsavel>(`/responsaveis/${id}`, data);

/**
 * Remove um responsável pelo ID.
 * DELETE /responsaveis/:id
 * @param id - ID do responsável.
 * @returns Confirmação da exclusão.
 */
export const deleteResponsavel = (id: string) =>
  api.delete(`/responsaveis/${id}`);
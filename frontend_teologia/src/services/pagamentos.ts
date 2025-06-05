// src/services/pagamentos.ts

import { api } from "./api";
import { Pagamento } from "@/types/Pagamento"; // ✅ Importa a tipagem real para consistência

/**
 * Busca a lista de todos os pagamentos.
 * GET /pagamentos
 * @returns Lista de pagamentos.
 */
export const getPagamentos = () =>
  api.get<Pagamento[]>("/pagamentos");

/**
 * Busca um pagamento específico pelo ID.
 * GET /pagamentos/:id
 * @param id - ID do pagamento.
 * @returns Dados completos do pagamento.
 */
export const getPagamento = (id: string) =>
  api.get<Pagamento>(`/pagamentos/${id}`);

/**
 * Cria um novo pagamento.
 * POST /pagamentos
 * @param data - Dados do pagamento a serem criados.
 * @returns Pagamento criado.
 */
export const createPagamento = (data: Partial<Pagamento>) =>
  api.post<Pagamento>("/pagamentos", data);

/**
 * Atualiza um pagamento existente.
 * PUT /pagamentos/:id
 * @param id - ID do pagamento.
 * @param data - Dados atualizados do pagamento.
 * @returns Pagamento atualizado.
 */
export const updatePagamento = (id: string, data: Partial<Pagamento>) =>
  api.put<Pagamento>(`/pagamentos/${id}`, data);

/**
 * Remove um pagamento pelo ID.
 * DELETE /pagamentos/:id
 * @param id - ID do pagamento.
 * @returns Confirmação da exclusão.
 */
export const deletePagamento = (id: string) =>
  api.delete(`/pagamentos/${id}`);
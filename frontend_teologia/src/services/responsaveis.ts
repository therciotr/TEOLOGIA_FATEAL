import { api } from "./api";
import { Responsavel } from "@/types/Responsavel";

/* Tipagem genérica de retorno para facilitar reaproveitamento */
type ApiResponse<T> = Promise<{ data: T }>;

/* ─────── Métodos REST ─────── */

const getResponsaveis = (
  params?: Partial<{ search: string; page: number; perPage: number }>
): ApiResponse<Responsavel[]> => api.get("/responsaveis", { params });

const getResponsavel = (id: string): ApiResponse<Responsavel> =>
  api.get(`/responsaveis/${id}`);

const createResponsavel = (
  data: Partial<Responsavel>
): ApiResponse<Responsavel> => api.post("/responsaveis", data);

const updateResponsavel = (
  id: string,
  data: Partial<Responsavel>
): ApiResponse<Responsavel> => api.put(`/responsaveis/${id}`, data);

const deleteResponsavel = (id: string): ApiResponse<void> =>
  api.delete(`/responsaveis/${id}`);

/* ─────── Export principal ─────── */

export const responsavelService = {
  getResponsaveis,
  getResponsavel,
  createResponsavel,
  updateResponsavel,
  deleteResponsavel,
};
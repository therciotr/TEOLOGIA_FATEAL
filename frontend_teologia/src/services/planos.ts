// ──────────────────────────────────────────
// src/services/planos.ts
// Serviço REST + React-Query hooks opcionais
// ──────────────────────────────────────────
import { api } from "./api";
import { Plano } from "@/types/Plano";

/* ##########################  Tipagem útil  ########################## */
type ApiResponse<T> = Promise<{ data: T }>;

/* ##########################  Métodos REST  ########################## */

/** Lista de planos – aceita filtros / paginação futuras por `params`. */
const getPlanos = (
  params?: Partial<{ search: string; page: number; perPage: number }>
): ApiResponse<Plano[]> => api.get("/planos", { params });

/** Detalhe de um plano. */
const getPlano = (id: string): ApiResponse<Plano> => api.get(`/planos/${id}`);

/** Cria novo plano. */
const createPlano = (data: Partial<Plano>): ApiResponse<Plano> =>
  api.post("/planos", data);

/** Atualiza plano existente. */
const updatePlano = (id: string, data: Partial<Plano>): ApiResponse<Plano> =>
  api.put(`/planos/${id}`, data);

/** Remove plano. */
const deletePlano = (id: string): ApiResponse<void> =>
  api.delete(`/planos/${id}`);

/* ##########################  Export consolidado  ########################## */

export const planoService = {
  getPlanos,
  getPlano,
  createPlano,
  updatePlano,
  deletePlano,
};

/* ##########################  Hooks React-Query (opcional)  ################# */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/** Hook para lista de planos (cache inteligente). */
export const usePlanos = (params?: Parameters<typeof getPlanos>[0]) =>
  useQuery({
    queryKey: ["planos", params],
    queryFn: () => getPlanos(params).then((r) => r.data),
  });

/** Hook para criar plano e invalidar cache. */
export const useCreatePlano = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPlano,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["planos"] }),
  });
};

/** Hook para atualizar plano. */
export const useUpdatePlano = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Plano> }) =>
      updatePlano(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["planos"] }),
  });
};

/** Hook para excluir plano. */
export const useDeletePlano = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePlano,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["planos"] }),
  });
};
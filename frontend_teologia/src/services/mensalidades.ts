// ──────────────────────────────────────────────────────
// src/services/mensalidades.ts
// Serviço + hooks (React Query opcional)
// ──────────────────────────────────────────────────────
import { api } from "./api";
import { Mensalidade } from "@/types/Mensalidade";

// ─── Tipagem auxiliar para respostas genéricas ────────
type ApiResponse<T> = Promise<{ data: T }>;

/* #####################################################
 *  Requests REST puros
 * ################################################### */

/** Lista mensalidades (com filtros opcionais). */
const getMensalidades = (
  params?: Partial<{
    alunoId: string;
    status: "pago" | "pendente";
    page: number;
    perPage: number;
  }>
): ApiResponse<Mensalidade[]> => api.get("/mensalidades", { params });

/** Detalhe de uma mensalidade. */
const getMensalidade = (id: string): ApiResponse<Mensalidade> =>
  api.get(`/mensalidades/${id}`);

/** Cria mensalidade. */
const createMensalidade = (
  payload: Partial<Mensalidade>
): ApiResponse<Mensalidade> => api.post("/mensalidades", payload);

/** Atualiza mensalidade. */
const updateMensalidade = (
  id: string,
  payload: Partial<Mensalidade>
): ApiResponse<Mensalidade> => api.put(`/mensalidades/${id}`, payload);

/** Remove mensalidade. */
const deleteMensalidade = (id: string): ApiResponse<void> =>
  api.delete(`/mensalidades/${id}`);

/* #####################################################
 *  Exporta em um único objeto (import elegante)
 * ################################################### */
export const mensalidadeService = {
  getMensalidades,
  getMensalidade,
  createMensalidade,
  updateMensalidade,
  deleteMensalidade,
};

/* #####################################################
 *  React-Query hooks (✨ opcional)
 * ################################################### */
//
//  ▸ Para usar: instale @tanstack/react-query e envolva
//    seu App com <QueryClientProvider>.
//
//  ▸ Se não pretende usar agora, basta ignorar a
//    exportação dos hooks abaixo.
//
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useMensalidades = (params?: Parameters<typeof getMensalidades>[0]) =>
  useQuery({
    queryKey: ["mensalidades", params],
    queryFn: () => getMensalidades(params).then((r) => r.data),
  });

export const useCreateMensalidade = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createMensalidade,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mensalidades"] }),
  });
};

export const useUpdateMensalidade = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Mensalidade> }) =>
      updateMensalidade(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mensalidades"] }),
  });
};

export const useDeleteMensalidade = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteMensalidade,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mensalidades"] }),
  });
};
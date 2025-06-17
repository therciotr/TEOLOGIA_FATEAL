// ──────────────────────────────────────────────────────
// src/services/pagamentos.ts
// Serviço REST + hooks opcionais
// ──────────────────────────────────────────────────────
import { api } from "./api";
import { Pagamento } from "@/types/Pagamento";

// ─── Tipagem auxiliar ────────────────
type ApiResponse<T> = Promise<{ data: T }>;

/* #####################################################
 *  Métodos RESTful
 * ################################################### */

/** Lista de pagamentos (filtros opcionais). */
const getPagamentos = (
  params?: Partial<{ alunoId: string; status: string; page: number; perPage: number }>
): ApiResponse<Pagamento[]> => api.get("/pagamentos", { params });

/** Detalhes de um pagamento. */
const getPagamento = (id: string): ApiResponse<Pagamento> =>
  api.get(`/pagamentos/${id}`);

/** Cria novo pagamento. */
const createPagamento = (data: Partial<Pagamento>): ApiResponse<Pagamento> =>
  api.post("/pagamentos", data);

/** Atualiza um pagamento existente. */
const updatePagamento = (
  id: string,
  data: Partial<Pagamento>
): ApiResponse<Pagamento> => api.put(`/pagamentos/${id}`, data);

/** Exclui um pagamento. */
const deletePagamento = (id: string): ApiResponse<void> =>
  api.delete(`/pagamentos/${id}`);

/* #####################################################
 *  Exporta tudo junto para facilitar uso
 * ################################################### */
export const pagamentoService = {
  getPagamentos,
  getPagamento,
  createPagamento,
  updatePagamento,
  deletePagamento,
};

/* #####################################################
 *  React Query hooks (opcional)
 * ################################################### */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const usePagamentos = (params?: Parameters<typeof getPagamentos>[0]) =>
  useQuery({
    queryKey: ["pagamentos", params],
    queryFn: () => getPagamentos(params).then((r) => r.data),
  });

export const useCreatePagamento = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPagamento,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pagamentos"] }),
  });
};

export const useUpdatePagamento = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Pagamento> }) =>
      updatePagamento(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pagamentos"] }),
  });
};

export const useDeletePagamento = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePagamento,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pagamentos"] }),
  });
};
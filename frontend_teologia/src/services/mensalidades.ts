// ──────────────────────────────────────────────────────────────
// src/services/mensalidades.ts
// Serviço REST + hooks (opcional) para Mensalidades
// ──────────────────────────────────────────────────────────────
import api from "@/services/api";               // alias absoluto
import type { Mensalidade } from "@/types/Mensalidade";
import type { AxiosResponse } from "axios";

/* ------------------------------------------------------------- */
/*  1. Tipagens auxiliares                                       */
/* ------------------------------------------------------------- */
type ServiceResult<T> = Promise<T>;

interface ListParams {
  alunoId?: string;
  status?: "pago" | "pendente";
  page?: number;
  perPage?: number;
}

/* ------------------------------------------------------------- */
/*  2. Chamadas REST puras                                       */
/* ------------------------------------------------------------- */
async function getMensalidades(
  params?: ListParams,
): ServiceResult<Mensalidade[]> {
  const { data } = await api.get<Mensalidade[]>("/mensalidades", { params });
  return data;
}

async function getMensalidade(id: string): ServiceResult<Mensalidade> {
  const { data } = await api.get<Mensalidade>(`/mensalidades/${id}`);
  return data;
}

async function createMensalidade(
  payload: Partial<Mensalidade>,
): ServiceResult<Mensalidade> {
  const { data } = await api.post<Mensalidade>("/mensalidades", payload);
  return data;
}

async function updateMensalidade(
  id: string,
  payload: Partial<Mensalidade>,
): ServiceResult<Mensalidade> {
  const { data } = await api.put<Mensalidade>(`/mensalidades/${id}`, payload);
  return data;
}

async function deleteMensalidade(id: string): ServiceResult<void> {
  await api.delete(`/mensalidades/${id}`);
}

/* ------------------------------------------------------------- */
/*  3. Export principal                                          */
/* ------------------------------------------------------------- */
export const mensalidadeService = {
  getMensalidades,
  getMensalidade,
  createMensalidade,
  updateMensalidade,
  deleteMensalidade,
};

export default mensalidadeService; // permite `import mensalidadeService from ...`

/* ############################################################# */
/*  4. Hooks prontos (React-Query) – use se quiser               */
/* ############################################################# */
//
// Para usar, instale:
//
//   pnpm add @tanstack/react-query
//
// e envolva o App com <QueryClientProvider>.  Caso não use,
// basta remover o bloco abaixo.
//
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useMensalidades = (params?: ListParams) =>
  useQuery({
    queryKey: ["mensalidades", params],
    queryFn: () => getMensalidades(params),
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

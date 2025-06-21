// src/services/api.ts
/* ------------------------------------------------------------------------- */
/* Axios + helpers para comunicação com a API REST                           */
/* ------------------------------------------------------------------------- */
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";               // se preferir, troque por react-hot-toast
import type { Mensalidade } from "@/types/Mensalidade";

/* ------------------------------------------------------------------------- */
/* 1. Configurações básicas                                                  */
/* ------------------------------------------------------------------------- */
// ➜ Usa variável de ambiente em modo dev/prod e cai no domínio público como
//    fallback (útil em build estático ou Storybook).
const BASE_URL =
  import.meta.env.VITE_API_URL ??
  "https://fateal.trsystemas.com.br/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,          // envia cookie se backend exigir
});

/* ------------------------------------------------------------------------- */
/* 2. Helpers de autenticação                                                */
/* ------------------------------------------------------------------------- */
export function setAuthToken(token: string | null) {
  if (token) localStorage.setItem("token", token);
  else       localStorage.removeItem("token");
}

function attachToken(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}

/* ------------------------------------------------------------------------- */
/* 3. Interceptores globais                                                  */
/* ------------------------------------------------------------------------- */
api.interceptors.request.use(attachToken);

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ message?: string }>) => {
    const status = err.response?.status;
    const msg    =
      err.response?.data?.message ??
      err.message ??
      "Erro ao se comunicar com o servidor.";

    toast.error(msg);

    // Desloga se token expirou ou for inválido
    if (status === 401 || status === 403) {
      setAuthToken(null);
      toast.error("Sessão expirada, faça login novamente.");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

/* ------------------------------------------------------------------------- */
/* 4. Serviços de domínio (exemplo: Mensalidades)                            */
/*    Você pode dividir em arquivos menores depois; aqui fica compacto.      */
/* ------------------------------------------------------------------------- */

/**
 * Obtém todas as mensalidades.
 * Pode ser refinado com paginação ou filtros quando necessário.
 */
export async function getMensalidades(): Promise<Mensalidade[]> {
  const { data } = await api.get<Mensalidade[]>("/mensalidades");
  return data;
}

/* ------------------------------------------------------------------------- */
/* 5. Exporte outros helpers quando precisar                                 */
/* ------------------------------------------------------------------------- */
export default api;   // import default é prático: `import api from "@/services/api"`

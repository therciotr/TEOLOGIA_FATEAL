import axios from "axios";
import { toast } from "sonner"; // Exibe mensagens amigáveis

// Define a base da API (você pode trocar para variável de ambiente no futuro)
const BASE_URL = "https://fateal.trsystemas.com.br/api";

// Instância central do axios
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor global de erros (feedback + ações)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Mostra erro genérico
    const msg = error?.response?.data?.message || "Erro ao se comunicar com o servidor.";
    toast.error(`Erro: ${msg}`);

    // Ações específicas para erros de autenticação
    if (error.response?.status === 401 || error.response?.status === 403) {
      toast.error("Sessão expirada. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redireciona para login
    }

    return Promise.reject(error);
  }
);
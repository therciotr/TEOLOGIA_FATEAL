// src/services/api.ts
import axios from "axios";
import { Mensalidade } from "@/types/Mensalidade"; // Ajuste o caminho se necessário

// Cria a instância do Axios
export const api = axios.create({
  baseURL: "https://fateal.trsystemas.com.br/api", // ajuste para o seu endpoint real
});

// Interceptor para adicionar o token automaticamente se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função para buscar mensalidades (GET /mensalidades)
export const getMensalidades = async (): Promise<Mensalidade[]> => {
  const response = await api.get("/mensalidades");
  return response.data;
};
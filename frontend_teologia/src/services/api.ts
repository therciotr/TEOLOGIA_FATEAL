// src/services/api.ts
import axios from "axios";

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
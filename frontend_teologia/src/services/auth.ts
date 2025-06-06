// src/services/auth.ts
import { api } from "./api";

/**
 * Faz login e salva o token no localStorage
 */
export async function login(email: string, senha: string) {
  const response = await api.post("/auth/login", { email, senha });
  const { token } = response.data;
  localStorage.setItem("token", token);
}

/**
 * Remove o token do localStorage (logout)
 */
export function logout() {
  localStorage.removeItem("token");
}

/**
 * Retorna o token do localStorage
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Verifica se o usuário está autenticado (token presente)
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token");
}
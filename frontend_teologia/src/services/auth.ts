// src/services/auth.ts
import { api } from "./api";

export async function login(email: string, senha: string) {
  const response = await api.post("/auth/login", { email, senha });
  const { token } = response.data;
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}
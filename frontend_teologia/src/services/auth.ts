// src/services/auth.ts
import jwtDecode from "jwt-decode";
import { api } from "./api";

/* ------------------------------------------------------------------
   Tipagens utilitárias
-------------------------------------------------------------------*/
interface JwtPayload {
  sub: string;          // userId
  nome: string;
  perfil: string;
  exp: number;          // unix timestamp (segundos)
}
interface LoginResponse {
  access_token: string;
  nome: string;
  perfil: string;
}

/* ------------------------------------------------------------------
   Helpers
-------------------------------------------------------------------*/
const TOKEN_KEY = "token";
const USER_KEY  = "userInfo";  // nome + perfil em JSON

function saveSession(token: string, user: { nome: string; perfil: string }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/* ------------------------------------------------------------------
   API calls
-------------------------------------------------------------------*/

/** Login do usuário e persistência do token + informações básicas */
export async function login(email: string, senha: string, remember = true) {
  const { data } = await api.post<LoginResponse>("/auth/login", { email, senha });

  // Caso tenha “lembrar-me” false podemos trocar para sessionStorage
  if (!remember) {
    sessionStorage.setItem(TOKEN_KEY, data.access_token);
  } else {
    saveSession(data.access_token, { nome: data.nome, perfil: data.perfil });
  }
}

/** Logout global */
export function logout() {
  clearSession();
  sessionStorage.removeItem(TOKEN_KEY);
}

/** Esqueci minha senha – envia link de recuperação */
export function forgotPassword(email: string) {
  // Ajuste a rota conforme seu backend
  return api.post("/auth/forgot-password", { email });
}

/** (Opcional) Refresh do token – se o backend expõe /auth/refresh */
export async function refreshToken() {
  const { data } = await api.post<{ access_token: string }>("/auth/refresh");
  localStorage.setItem(TOKEN_KEY, data.access_token);
  return data.access_token;
}

/* ------------------------------------------------------------------
   Getters utilitários
-------------------------------------------------------------------*/
export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as { nome: string; perfil: string }) : null;
}

/** Verifica se há token e se ainda está válido (exp > Date.now()) */
export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    // exp é em segundos → converter para ms
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
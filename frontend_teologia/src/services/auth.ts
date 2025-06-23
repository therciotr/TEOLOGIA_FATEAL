// src/services/auth.ts
import { jwtDecode }       from "jwt-decode";
import type { JwtPayload } from "jwt-decode";
import { api }             from "./api";

/* ------------------------------------------------------------------
   Tipagens utilitárias
-------------------------------------------------------------------*/
interface AppJwtPayload extends JwtPayload {
  sub:   string;   // userId
  nome:  string;
  perfil:string;
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
const USER_KEY  = "userInfo";

function saveToken(token: string, remember: boolean) {
  (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
}
function saveUser(user: { nome: string; perfil: string }, remember: boolean) {
  (remember ? localStorage : sessionStorage).setItem(USER_KEY, JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

/* ------------------------------------------------------------------
   API calls
-------------------------------------------------------------------*/
export async function login(email: string, senha: string, remember = true) {
  const { data } = await api.post<LoginResponse>("/auth/login", { email, senha });

  saveToken(data.access_token, remember);
  saveUser({ nome: data.nome, perfil: data.perfil }, remember);

  return { token: data.access_token, user: { nome: data.nome, perfil: data.perfil } };
}

export function logout() {
  clearSession();
}

export function forgotPassword(email: string) {
  return api.post("/auth/forgot-password", { email });
}

export async function refreshToken() {
  const { data } = await api.post<{ access_token: string }>("/auth/refresh");
  saveToken(data.access_token, true); // geralmente refresh é “lembrado”
  return data.access_token;
}

/* ------------------------------------------------------------------
   Getters utilitários
-------------------------------------------------------------------*/
export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as { nome: string; perfil: string }) : null;
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode<AppJwtPayload>(token);
    const valid = exp * 1000 > Date.now();
    if (!valid) clearSession();  // remove token expirado
    return valid;
  } catch {
    clearSession();
    return false;
  }
}

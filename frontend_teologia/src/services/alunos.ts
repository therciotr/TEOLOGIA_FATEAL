// src/services/alunos.ts
import { api } from "./api";
import type { Aluno } from "@/types/Aluno";

/* ─────────── Tipos auxiliares ─────────── */
export type AlunoPayload = Omit<Aluno, "id" | "createdAt" | "updatedAt">;

/**
 * Constrói cabeçalhos adequados se o payload for FormData.
 */
function buildHeaders(body: unknown) {
  return body instanceof FormData
    ? { "Content-Type": "multipart/form-data" }
    : undefined;
}

/* ─────────── CRUD isolado (named exports) ─────────── */

export async function listAlunos(): Promise<Aluno[]> {
  const { data } = await api.get<Aluno[]>("/alunos");
  return data;
}

export async function getAluno(id: string): Promise<Aluno> {
  const { data } = await api.get<Aluno>(`/alunos/${id}`);
  return data;
}

export async function createAluno(body: AlunoPayload | FormData): Promise<Aluno> {
  const { data } = await api.post<Aluno>("/alunos", body, {
    headers: buildHeaders(body),
  });
  return data;
}

export async function updateAluno(
  id: string,
  body: Partial<AlunoPayload> | FormData,
): Promise<Aluno> {
  const { data } = await api.patch<Aluno>(`/alunos/${id}`, body, {
    headers: buildHeaders(body),
  });
  return data;
}

export async function deleteAluno(id: string): Promise<void> {
  await api.delete(`/alunos/${id}`);
}

/* ─────────── Extras opcionais ─────────── */

/** Upload de foto - retorna a URL gerada pelo backend */
export async function uploadFoto(id: string, file: File): Promise<string> {
  const form = new FormData();
  form.append("foto", file);

  const { data } = await api.post<{ url: string }>(
    `/alunos/${id}/foto`,
    form,
    { headers: buildHeaders(form) },
  );
  return data.url;
}

/** Busca paginada/filtrada (exemplo genérico) */
export async function searchAlunos(query = "", page = 1, limit = 10) {
  const { data } = await api.get<{
    items: Aluno[];
    total: number;
    page: number;
    limit: number;
  }>("/alunos/search", { params: { q: query, page, limit } });
  return data;
}

/* ─────────── Wrapper estilo “service” ─────────── */

export const AlunoService = {
  listAlunos,
  getAluno,
  createAluno,
  updateAluno,
  deleteAluno,
  uploadFoto,
  searchAlunos,
};

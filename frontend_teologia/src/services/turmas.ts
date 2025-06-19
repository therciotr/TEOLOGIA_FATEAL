import { api } from "./api";
import { Turma } from "@/types/Turma";

/* Tipagem utilitária para todas as respostas */
type ApiResponse<T> = Promise<{ data: T }>;

/* ──────────────── Métodos CRUD ──────────────── */

const getTurmas = (
  params?: Partial<{ search: string; page: number; perPage: number }>
): ApiResponse<Turma[]> => api.get("/turmas", { params });

const getTurma = (id: string): ApiResponse<Turma> => api.get(`/turmas/${id}`);

const createTurma = (data: Partial<Turma>): ApiResponse<Turma> =>
  api.post("/turmas", data);

const updateTurma = (
  id: string,
  data: Partial<Turma>
): ApiResponse<Turma> => api.put(`/turmas/${id}`, data);

const deleteTurma = (id: string): ApiResponse<void> => api.delete(`/turmas/${id}`);

/* ──────────────── Export principal ──────────────── */

export const turmaService = {
  getTurmas,
  getTurma,
  createTurma,
  updateTurma,
  deleteTurma,
};
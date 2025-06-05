// src/services/alunos.ts

import { api } from "./api";
import { Aluno } from "@/types/Aluno"; // Importa a interface de Aluno para tipagem

/**
 * Retorna a lista de todos os alunos.
 * GET /alunos
 */
export const getAlunos = () => api.get<Aluno[]>("/alunos");

/**
 * Retorna os detalhes de um aluno específico pelo ID.
 * GET /alunos/:id
 * @param id - ID do aluno
 */
export const getAluno = (id: string) => api.get<Aluno>(`/alunos/${id}`);

/**
 * Cria um novo aluno no banco de dados.
 * POST /alunos
 * @param data - Dados do aluno (FormData: inclui foto e documentos, se necessário)
 */
export const createAluno = (data: FormData) => api.post<Aluno>("/alunos", data, {
  headers: { "Content-Type": "multipart/form-data" },
});

/**
 * Atualiza os dados de um aluno específico.
 * PATCH /alunos/:id
 * @param id - ID do aluno
 * @param data - Dados atualizados (FormData)
 */
export const updateAluno = (id: string, data: FormData) =>
  api.patch<Aluno>(`/alunos/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/**
 * Remove um aluno do banco de dados.
 * DELETE /alunos/:id
 * @param id - ID do aluno
 */
export const deleteAluno = (id: string) => api.delete(`/alunos/${id}`);
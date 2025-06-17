import { api } from "./api";
import { Aluno } from "@/types/Aluno";

/**
 * Serviço para operações com alunos.
 * Funções organizadas e retornam apenas os dados úteis.
 */
export const AlunoService = {
  /**
   * Lista todos os alunos.
   */
  getAlunos: async (): Promise<Aluno[]> => {
    const response = await api.get<Aluno[]>("/alunos");
    return response.data;
  },

  /**
   * Busca um aluno pelo ID.
   * @param id - ID do aluno
   */
  getAluno: async (id: string): Promise<Aluno> => {
    const response = await api.get<Aluno>(`/alunos/${id}`);
    return response.data;
  },

  /**
   * Cria um novo aluno.
   * @param data - FormData contendo os dados do aluno
   */
  createAluno: async (data: FormData): Promise<Aluno> => {
    const response = await api.post<Aluno>("/alunos", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  /**
   * Atualiza os dados de um aluno.
   * @param id - ID do aluno
   * @param data - FormData com os dados atualizados
   */
  updateAluno: async (id: string, data: FormData): Promise<Aluno> => {
    const response = await api.patch<Aluno>(`/alunos/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  /**
   * Remove um aluno.
   * @param id - ID do aluno
   */
  deleteAluno: async (id: string): Promise<void> => {
    await api.delete(`/alunos/${id}`);
  },
};
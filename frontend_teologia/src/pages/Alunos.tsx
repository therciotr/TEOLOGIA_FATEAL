// src/pages/Alunos.tsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AlunoForm from "../components/AlunoForm";
import { Button } from "@/components/ui/button";
import { getAlunos, createAluno, updateAluno } from "@/services/alunos";
import { Aluno } from "@/types/Aluno"; // 👈 Importa o tipo correto!

/**
 * Interface que representa a estrutura de um aluno.
 * Inclui todos os campos relevantes, incluindo matriculaPaga.
 */
interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  rg?: string;
  turmaId?: string;
  fotoUrl?: string;
  matriculaPaga: boolean;
}

/**
 * Página de listagem de alunos.
 * Permite cadastrar novo aluno e editar existentes.
 */
const Alunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [showForm, setShowForm] = useState(false);

  /**
   * Busca a lista de alunos da API.
   */
  const fetchAlunos = async () => {
    try {
      const response = await getAlunos();
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  // Carrega a lista ao montar o componente
  useEffect(() => {
    fetchAlunos();
  }, []);

  /**
   * Abre o formulário para cadastrar novo aluno.
   */
  const handleNew = () => {
    setSelectedAluno(null);
    setShowForm(true);
  };

  /**
   * Abre o formulário para editar um aluno existente.
   */
  const handleEdit = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setShowForm(true);
  };

  /**
   * Fecha o formulário sem salvar.
   */
  const handleCancel = () => {
    setShowForm(false);
    setSelectedAluno(null);
  };

  /**
   * Salva um novo aluno ou atualiza um existente.
   * Usa a API com FormData.
   */
  const handleSave = async (formData: FormData) => {
    try {
      if (selectedAluno) {
        // Atualizar aluno existente
        await updateAluno(selectedAluno.id, formData);
      } else {
        // Cadastrar novo aluno
        await createAluno(formData);
      }
      setShowForm(false);
      fetchAlunos();
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Alunos</h1>

          {/* Botão para cadastrar novo aluno */}
          <Button className="mb-4" onClick={handleNew}>
            Novo Aluno
          </Button>

          {/* Formulário de cadastro/edição */}
          {showForm && (
            <div className="mb-4">
              <AlunoForm
                aluno={selectedAluno!}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          )}

          {/* Tabela de alunos */}
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Nome</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Telefone</th>
                <th className="border px-4 py-2 text-left">Endereço</th>
                <th className="border px-4 py-2 text-left">RG</th>
                <th className="border px-4 py-2 text-left">Matrícula Paga</th>
                <th className="border px-4 py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr
                  key={aluno.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border px-4 py-2">{aluno.nome}</td>
                  <td className="border px-4 py-2">{aluno.email}</td>
                  <td className="border px-4 py-2">{aluno.telefone || "-"}</td>
                  <td className="border px-4 py-2">{aluno.endereco || "-"}</td>
                  <td className="border px-4 py-2">{aluno.rg || "-"}</td>
                  <td className="border px-4 py-2">
                    {aluno.matriculaPaga ? "Sim" : "Não"}
                  </td>
                  <td className="border px-4 py-2">
                    <Button onClick={() => handleEdit(aluno)}>Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Alunos;
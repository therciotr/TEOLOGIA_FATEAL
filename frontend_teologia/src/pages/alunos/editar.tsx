// src/pages/alunos/editar.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAluno, updateAluno } from "@/services/alunos";
import AlunoForm from "@/components/AlunoForm";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Aluno } from "@/types/Aluno"; // 👈 Importa o tipo correto!

/**
 * Interface do aluno, alinhada com a interface global do projeto.
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
  documentos: { id: string; nome: string; url: string }[];
}

/**
 * Página de edição de aluno.
 * Busca o aluno por ID e exibe o formulário para edição.
 */
const EditarAluno: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<Aluno | null>(null);

  /**
   * Busca os dados do aluno ao carregar a página.
   */
  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await getAluno(id!);
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    };
    if (id) {
      fetchAluno();
    }
  }, [id]);

  /**
   * Manipula o salvamento do aluno.
   * Atualiza o aluno usando o serviço e redireciona para a lista.
   */
  const handleSave = async (formData: FormData) => {
    try {
      await updateAluno(id!, formData);
      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Editar Aluno</h1>

          {/* Formulário de edição */}
          {aluno ? (
            <AlunoForm
              aluno={aluno}
              onSave={handleSave}
              onCancel={() => navigate("/alunos")}
            />
          ) : (
            <p>Carregando dados do aluno...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default EditarAluno;
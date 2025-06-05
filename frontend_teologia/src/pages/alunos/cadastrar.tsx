// src/pages/alunos/cadastrar.tsx
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AlunoForm from "@/components/AlunoForm";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";

const CadastrarAluno: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = async (formData: FormData) => {
    try {
      await api.post("/alunos", formData);
      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Cadastrar Aluno</h1>
          <AlunoForm onSave={handleSave} onCancel={() => navigate("/alunos")} />
        </main>
      </div>
    </div>
  );
};

export default CadastrarAluno;
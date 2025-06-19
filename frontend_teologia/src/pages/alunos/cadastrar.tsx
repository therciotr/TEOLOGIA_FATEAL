import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AlunoForm from "@/components/AlunoForm";
import { api } from "@/services/api";
import { toast } from "sonner";

/**
 * Página para cadastrar novo aluno.
 * Utiliza o componente AlunoForm com envio via API e feedback visual.
 */
const CadastrarAluno: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Lida com a submissão do formulário de aluno.
   * Faz POST para API e redireciona com feedback visual.
   */
  const handleSave = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await api.post("/alunos", formData);
      toast.success("Aluno cadastrado com sucesso!");
      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      toast.error("Erro ao cadastrar aluno. Verifique os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Topbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Cadastrar Aluno
          </h1>

          {/* Formulário de cadastro */}
          <AlunoForm
            onSave={handleSave}
            onCancel={() => navigate("/alunos")}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default CadastrarAluno;
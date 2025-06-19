import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAluno, updateAluno } from "@/services/alunos";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AlunoForm from "@/components/AlunoForm";
import { toast } from "sonner";
import { Aluno } from "@/types/Aluno";

/**
 * Página para editar um aluno existente.
 * Busca os dados pelo ID da URL e exibe formulário com os dados preenchidos.
 */
const EditarAluno: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchAluno = async () => {
      setLoading(true);
      setErro(null);
      try {
        const response = await getAluno(id!);
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        setErro("Erro ao carregar aluno.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAluno();
    }
  }, [id]);

  /**
   * Envia os dados atualizados do aluno para a API.
   */
  const handleSave = async (formData: FormData) => {
    try {
      await updateAluno(id!, formData);
      toast.success("Aluno atualizado com sucesso!");
      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      toast.error("Erro ao atualizar aluno.");
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
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Editar Aluno
          </h1>

          {/* Estado de carregamento ou erro */}
          {loading && <p className="text-slate-600">Carregando aluno...</p>}
          {erro && <p className="text-red-500">{erro}</p>}

          {/* Formulário com dados carregados */}
          {aluno && (
            <AlunoForm
              aluno={aluno}
              onSave={handleSave}
              onCancel={() => navigate("/alunos")}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default EditarAluno;
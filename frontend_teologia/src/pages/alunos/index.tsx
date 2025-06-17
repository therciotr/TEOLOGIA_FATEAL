import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Aluno } from "@/types/Aluno";
import { Eye, Pencil } from "lucide-react";

const Alunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/alunos");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Lista de Alunos
            </h1>
            <Button onClick={() => navigate("/alunos/cadastrar")}>
              Novo Aluno
            </Button>
          </div>

          {loading ? (
            <p className="text-slate-600 dark:text-slate-300">Carregando alunos...</p>
          ) : (
            <div className="overflow-auto rounded shadow">
              <table className="min-w-full text-sm bg-white dark:bg-slate-800 rounded border border-gray-300 dark:border-slate-700">
                <thead className="bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white">
                  <tr>
                    <th className="px-4 py-3 border-b">Nome</th>
                    <th className="px-4 py-3 border-b">Email</th>
                    <th className="px-4 py-3 border-b text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => (
                    <tr
                      key={aluno.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                      <td className="px-4 py-2 border-b">{aluno.nome}</td>
                      <td className="px-4 py-2 border-b">{aluno.email}</td>
                      <td className="px-4 py-2 border-b text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => navigate(`/alunos/editar/${aluno.id}`)}
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => navigate(`/alunos/visualizar/${aluno.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Visualizar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {alunos.length === 0 && (
                <p className="text-center text-slate-500 mt-4">
                  Nenhum aluno encontrado.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Alunos;
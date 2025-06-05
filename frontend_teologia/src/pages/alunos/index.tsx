// src/pages/alunos/index.tsx
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mensalidade } from "@/types/Mensalidade"; // 👈 Importa o tipo correto!

interface Aluno {
  id: string;
  nome: string;
  email: string;
}

const Alunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const navigate = useNavigate();

  const fetchAlunos = async () => {
    try {
      const response = await api.get("/alunos");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Lista de Alunos</h1>
          <Button className="mb-4" onClick={() => navigate("/alunos/cadastrar")}>
            Novo Aluno
          </Button>

          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Nome</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{aluno.nome}</td>
                  <td className="border px-4 py-2">{aluno.email}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <Button onClick={() => navigate(`/alunos/editar/${aluno.id}`)}>
                      Editar
                    </Button>
                    <Button onClick={() => navigate(`/alunos/visualizar/${aluno.id}`)}>
                      Visualizar
                    </Button>
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
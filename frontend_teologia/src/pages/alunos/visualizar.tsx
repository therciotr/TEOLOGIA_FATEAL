// src/pages/alunos/visualizar.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAluno } from "@/services/alunos";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Aluno } from "@/types/Aluno"; // 👈 Importa o tipo correto!
import { Documento } from "@/types/Documento"; // 👈 Importa o tipo correto!

/**
 * Interface do aluno, alinhada com a interface global
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
 * Página de visualização da ficha do aluno.
 * Exibe todos os dados de um aluno específico.
 */
const VisualizarAluno: React.FC = () => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Ficha do Aluno</h1>

          {aluno ? (
            <div className="space-y-4 bg-white rounded p-4 shadow">
              <p>
                <strong>Nome:</strong> {aluno.nome}
              </p>
              <p>
                <strong>Email:</strong> {aluno.email}
              </p>
              <p>
                <strong>Telefone:</strong> {aluno.telefone || "-"}
              </p>
              <p>
                <strong>Endereço:</strong> {aluno.endereco || "-"}
              </p>
              <p>
                <strong>RG:</strong> {aluno.rg || "-"}
              </p>
              <p>
                <strong>Turma:</strong> {aluno.turmaId || "-"}
              </p>
              <p>
                <strong>Matrícula Paga:</strong>{" "}
                {aluno.matriculaPaga ? "Sim" : "Não"}
              </p>

              {/* Exibe a foto 3x4, se existir */}
              {aluno.fotoUrl && (
                <div>
                  <strong>Foto 3x4:</strong>
                  <img
                    src={aluno.fotoUrl}
                    alt="Foto do aluno"
                    className="w-24 h-24 rounded mt-2 object-cover"
                  />
                </div>
              )}

              {/* Lista de documentos do aluno */}
              {aluno.documentos && aluno.documentos.length > 0 && (
                <div>
                  <strong>Documentos:</strong>
                  <ul className="list-disc pl-4">
                    {aluno.documentos.map((doc) => (
                      <li key={doc.id}>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {doc.nome}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                className="mt-4"
                onClick={() => navigate("/alunos")}
              >
                Voltar para lista
              </Button>
            </div>
          ) : (
            <p>Carregando ficha do aluno...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default VisualizarAluno;
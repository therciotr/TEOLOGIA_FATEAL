import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Turma } from "@/types/Turma"; // 👈 Importa o tipo correto!

/**
 * Página de listagem de turmas.
 * Usa chamada à API e exibe feedback visual para UX de qualidade.
 */
export default function Turmas() {
  const [turmas, setTurmas] = useState<any[]>([]); // Estado que armazena lista de turmas
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para exibir erros

  /**
   * Função para buscar turmas da API.
   * Usa async/await e tratamento de erros.
   */
  const fetchTurmas = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/turmas");
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
      setError("Erro ao carregar turmas.");
    } finally {
      setLoading(false);
    }
  };

  // Busca turmas ao montar o componente
  useEffect(() => {
    fetchTurmas();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Turmas</h1>

      {/* Feedback de carregamento */}
      {loading && <p>Carregando turmas...</p>}

      {/* Mensagem de erro */}
      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Mensagem de lista vazia */}
      {!loading && turmas.length === 0 && !error && (
        <p>Nenhuma turma cadastrada.</p>
      )}

      {/* Lista de turmas em cards */}
      {turmas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {turmas.map((turma) => (
            <Card key={turma.id}>
              <CardContent className="p-4 space-y-1">
                <p>
                  <strong>ID:</strong> {turma.id}
                </p>
                <p>
                  <strong>Nome:</strong> {turma.nome}
                </p>
                <p>
                  <strong>Plano:</strong> {turma.plano?.nome || "Sem plano"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Botão de recarregar dados */}
      <Button className="mt-4 self-center" onClick={fetchTurmas}>
        Recarregar
      </Button>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Responsavel } from "@/types/Responsavel"; // 👈 Importa o tipo correto!

/**
 * Página de listagem de responsáveis.
 * Usa chamada à API e exibe feedback visual para UX de qualidade.
 */
export default function Responsaveis() {
  const [responsaveis, setResponsaveis] = useState<any[]>([]); // Lista de responsáveis
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  /**
   * Função para buscar responsáveis da API.
   * Usa async/await e tratamento de erros.
   */
  const fetchResponsaveis = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/responsaveis");
      setResponsaveis(response.data);
    } catch (error) {
      console.error("Erro ao buscar responsáveis:", error);
      setError("Erro ao carregar responsáveis.");
    } finally {
      setLoading(false);
    }
  };

  // Busca responsáveis ao montar o componente
  useEffect(() => {
    fetchResponsaveis();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Responsáveis</h1>

      {/* Feedback de carregamento */}
      {loading && <p>Carregando responsáveis...</p>}

      {/* Mensagem de erro */}
      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Mensagem de lista vazia */}
      {!loading && responsaveis.length === 0 && !error && (
        <p>Nenhum responsável cadastrado.</p>
      )}

      {/* Lista de responsáveis em cards */}
      {responsaveis.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {responsaveis.map((resp) => (
            <Card key={resp.id}>
              <CardContent className="p-4 space-y-1">
                <p>
                  <strong>ID:</strong> {resp.id}
                </p>
                <p>
                  <strong>Nome:</strong> {resp.nome}
                </p>
                <p>
                  <strong>Email:</strong> {resp.email || "-"}
                </p>
                <p>
                  <strong>Telefone:</strong> {resp.telefone || "-"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Botão de recarregar dados */}
      <Button className="mt-4 self-center" onClick={fetchResponsaveis}>
        Recarregar
      </Button>
    </div>
  );
}
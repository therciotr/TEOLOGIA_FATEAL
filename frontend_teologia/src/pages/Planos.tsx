import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plano } from "@/types/Plano"; // 👈 Importa o tipo correto!

/**
 * Página de listagem de planos.
 * Usa chamada à API e exibe feedback visual para UX de qualidade.
 */
export default function Planos() {
  const [planos, setPlanos] = useState<any[]>([]); // Estado que armazena lista de planos
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para exibir erros

  /**
   * Função para buscar planos da API.
   * Usa async/await e tratamento de erros com try/catch.
   */
  const fetchPlanos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/planos");
      setPlanos(response.data);
    } catch (error) {
      console.error("Erro ao buscar planos:", error);
      setError("Erro ao carregar planos."); // Mensagem amigável
    } finally {
      setLoading(false);
    }
  };

  // Busca planos ao montar o componente
  useEffect(() => {
    fetchPlanos();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Planos</h1>

      {/* Feedback de carregamento */}
      {loading && <p>Carregando planos...</p>}

      {/* Mensagem de erro */}
      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Mensagem de lista vazia */}
      {!loading && planos.length === 0 && !error && (
        <p>Nenhum plano cadastrado.</p>
      )}

      {/* Lista de planos em cards */}
      {planos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planos.map((plano) => (
            <Card key={plano.id}>
              <CardContent className="p-4 space-y-1">
                <p>
                  <strong>ID:</strong> {plano.id}
                </p>
                <p>
                  <strong>Nome:</strong> {plano.nome}
                </p>
                <p>
                  <strong>Valor:</strong> R$ {plano.valor.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Botão para recarregar dados */}
      <Button className="mt-4 self-center" onClick={fetchPlanos}>
        Recarregar
      </Button>
    </div>
  );
}
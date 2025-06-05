import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagamento } from "@/types/Pagamento"; // 👈 Importa o tipo correto!

/**
 * Página de listagem de pagamentos.
 * Usa chamada à API e exibe feedback visual para UX de qualidade.
 */
export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Feedback visual de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para exibir erros

  /**
   * Função para buscar pagamentos na API.
   * Usa async/await e try/catch para tratamento de erros.
   */
  const fetchPagamentos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/pagamentos");
      setPagamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
      setError("Erro ao carregar pagamentos."); // Mensagem de erro amigável
    } finally {
      setLoading(false);
    }
  };

  // Busca pagamentos ao montar o componente
  useEffect(() => {
    fetchPagamentos();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Pagamentos</h1>

      {/* Feedback de carregamento */}
      {loading && <p>Carregando pagamentos...</p>}

      {/* Mensagem de erro */}
      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Mensagem de lista vazia */}
      {!loading && pagamentos.length === 0 && !error && (
        <p>Nenhum pagamento encontrado.</p>
      )}

      {/* Lista de pagamentos em cards */}
      {pagamentos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagamentos.map((pagamento) => (
            <Card key={pagamento.id}>
              <CardContent className="p-4 space-y-1">
                <p>
                  <strong>ID:</strong> {pagamento.id}
                </p>
                <p>
                  <strong>Mensalidade ID:</strong> {pagamento.mensalidadeId}
                </p>
                <p>
                  <strong>Valor Pago:</strong> R$ {pagamento.valor_pago.toFixed(2)}
                </p>
                <p>
                  <strong>Método:</strong> {pagamento.metodo}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(pagamento.data_pagamento).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Botão de recarregar dados */}
      <Button className="mt-4 self-center" onClick={fetchPagamentos}>
        Recarregar
      </Button>
    </div>
  );
}
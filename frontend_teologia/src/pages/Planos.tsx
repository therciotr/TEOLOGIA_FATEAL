import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plano } from "@/types/Plano";

export default function Planos() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/planos");
      setPlanos(response.data);
    } catch (error) {
      console.error("Erro ao buscar planos:", error);
      setError("Erro ao carregar planos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanos();
  }, []);

  const formatCurrency = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50 dark:bg-slate-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Planos</h1>

      {loading && (
        <p className="text-gray-500 dark:text-gray-400 mb-4">Carregando planos...</p>
      )}

      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {!loading && planos.length === 0 && !error && (
        <p className="text-gray-500 dark:text-gray-400">Nenhum plano cadastrado.</p>
      )}

      {planos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {planos.map((plano) => (
            <Card key={plano.id}>
              <CardContent className="p-4 space-y-1">
                <p>
                  <span className="text-sm text-slate-500">ID:</span> {plano.id}
                </p>
                <p>
                  <span className="text-sm text-slate-500">Nome:</span> {plano.nome}
                </p>
                <p>
                  <span className="text-sm text-slate-500">Valor:</span> {formatCurrency(plano.valor)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Button onClick={fetchPlanos} disabled={loading}>
          🔄 Recarregar
        </Button>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagamento } from "@/types/Pagamento";

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPagamentos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/pagamentos");
      setPagamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
      setError("Erro ao carregar pagamentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagamentos();
  }, []);

  const formatCurrency = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString("pt-BR")} - ${d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const metodoClass = (metodo: string) => {
    switch (metodo.toLowerCase()) {
      case "pix":
        return "text-green-600 font-semibold";
      case "boleto":
        return "text-yellow-600 font-semibold";
      case "cartao":
        return "text-blue-600 font-semibold";
      default:
        return "text-slate-700 dark:text-slate-300";
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50 dark:bg-slate-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Pagamentos
      </h1>

      {loading && (
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Carregando pagamentos...
        </p>
      )}

      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {!loading && pagamentos.length === 0 && !error && (
        <p className="text-gray-500 dark:text-gray-400">Nenhum pagamento encontrado.</p>
      )}

      {pagamentos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {pagamentos.map((pagamento) => (
            <Card key={pagamento.id}>
              <CardContent className="p-4 space-y-1">
                <p>
                  <span className="text-sm text-slate-500">ID:</span> {pagamento.id}
                </p>
                <p>
                  <span className="text-sm text-slate-500">Mensalidade:</span>{" "}
                  {pagamento.mensalidadeId}
                </p>
                <p>
                  <span className="text-sm text-slate-500">Valor:</span>{" "}
                  {formatCurrency(pagamento.valor_pago)}
                </p>
                <p className={metodoClass(pagamento.metodo)}>
                  <span className="text-sm text-slate-500">Método:</span>{" "}
                  {pagamento.metodo}
                </p>
                <p>
                  <span className="text-sm text-slate-500">Data:</span>{" "}
                  {formatDateTime(pagamento.data_pagamento)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Button onClick={fetchPagamentos} disabled={loading}>
          🔄 Recarregar Pagamentos
        </Button>
      </div>
    </div>
  );
}
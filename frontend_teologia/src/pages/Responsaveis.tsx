import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Responsavel } from "@/types/Responsavel";

/**
 * Página de listagem de responsáveis.
 */
export default function Responsaveis() {
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchResponsaveis();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50 dark:bg-slate-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Responsáveis
      </h1>

      {/* Feedback de carregamento */}
      {loading && <p className="text-gray-600 dark:text-gray-300">Carregando responsáveis...</p>}

      {/* Mensagem de erro */}
      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

      {/* Lista vazia */}
      {!loading && responsaveis.length === 0 && !error && (
        <p className="text-gray-600 dark:text-gray-400">Nenhum responsável cadastrado.</p>
      )}

      {/* Lista */}
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

      {/* Botão de recarregar */}
      <div className="mt-6 flex justify-center">
        <Button onClick={fetchResponsaveis}>Recarregar</Button>
      </div>
    </div>
  );
}
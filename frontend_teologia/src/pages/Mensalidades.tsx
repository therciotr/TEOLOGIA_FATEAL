import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getMensalidades } from "../services/api";
import { Card } from "@/components/ui/card";
import { Mensalidade } from "@/types/Mensalidade"; // 👈 Importa o tipo correto!

/**
 * Interface que representa uma mensalidade.
 * Garante a consistência dos dados vindos da API.
 */
interface Mensalidade {
  id: number;
  aluno: string;
  valor: number;
  status: string;
  vencimento: string;
}

/**
 * Página de listagem de mensalidades.
 * Usa chamada à API e exibe feedback visual para UX de qualidade.
 */
const Mensalidades: React.FC = () => {
  const [mensalidades, setMensalidades] = useState<Mensalidade[]>([]);
  const [loading, setLoading] = useState(false); // Feedback visual durante carregamento
  const [error, setError] = useState<string | null>(null); // Estado para exibir erros

  /**
   * Função para buscar mensalidades.
   * Usa async/await para clareza e try/catch para tratar erros.
   */
  const fetchMensalidades = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getMensalidades();
      setMensalidades(data);
    } catch (err) {
      console.error("Erro ao buscar mensalidades:", err);
      setError("Erro ao carregar mensalidades.");
    } finally {
      setLoading(false);
    }
  };

  // Busca mensalidades ao montar o componente
  useEffect(() => {
    fetchMensalidades();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegação */}
      <Navbar />

      <div className="flex flex-1">
        {/* Barra lateral */}
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Mensalidades</h2>

          {/* Feedback de carregamento */}
          {loading && <p>Carregando mensalidades...</p>}

          {/* Mensagem de erro */}
          {error && (
            <p className="text-red-500 font-medium mb-4">{error}</p>
          )}

          {/* Mensagem de lista vazia */}
          {!loading && mensalidades.length === 0 && (
            <p>Nenhuma mensalidade encontrada.</p>
          )}

          {/* Tabela estilizada */}
          {mensalidades.length > 0 && (
            <Card className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Aluno</th>
                    <th className="border px-4 py-2 text-left">Valor</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Vencimento</th>
                  </tr>
                </thead>
                <tbody>
                  {mensalidades.map((m) => (
                    <tr
                      key={m.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border px-4 py-2">{m.aluno}</td>
                      <td className="border px-4 py-2">
                        R$ {m.valor.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2">{m.status}</td>
                      <td className="border px-4 py-2">{m.vencimento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Mensalidades;
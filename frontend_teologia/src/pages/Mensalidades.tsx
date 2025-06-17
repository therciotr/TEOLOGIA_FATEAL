import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getMensalidades } from "../services/api";
import { Card } from "@/components/ui/card";
import { Mensalidade } from "@/types/Mensalidade"; // tipo externo real

const Mensalidades: React.FC = () => {
  const [mensalidades, setMensalidades] = useState<Mensalidade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchMensalidades();
  }, []);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR");
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pago":
        return "text-green-600 font-medium";
      case "pendente":
        return "text-yellow-600 font-medium";
      case "vencido":
        return "text-red-600 font-medium";
      default:
        return "text-slate-700 dark:text-slate-300";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Mensalidades
          </h2>

          {loading && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Carregando mensalidades...
            </p>
          )}

          {error && (
            <p className="text-red-500 font-medium mb-4">{error}</p>
          )}

          {!loading && mensalidades.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nenhuma mensalidade encontrada.
            </p>
          )}

          {mensalidades.length > 0 && (
            <Card className="overflow-x-auto animate-fade-in">
              <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-slate-800">
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
                      className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <td className="border px-4 py-2">{m.aluno}</td>
                      <td className="border px-4 py-2">{formatCurrency(m.valor)}</td>
                      <td className={`border px-4 py-2 ${getStatusClass(m.status)}`}>
                        {m.status}
                      </td>
                      <td className="border px-4 py-2">{formatDate(m.vencimento)}</td>
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
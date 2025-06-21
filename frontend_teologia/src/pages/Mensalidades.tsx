// src/pages/Mensalidades.tsx
import { useCallback, useEffect, useState } from "react";
import Navbar   from "@/components/Navbar";
import Sidebar  from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { mensalidadeService } from "@/services/mensalidades";   // ✅ novo import
import type { Mensalidade }   from "@/types/Mensalidade";

export default function Mensalidades() {
  /* ──────────────── state ──────────────── */
  const [rows, setRows]         = useState<Mensalidade[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  /* ──────────────── helpers ────────────── */
  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mensalidadeService.getMensalidades();
      setRows(data);
    } catch (e) {
      console.error(e);
      setError("Não foi possível carregar as mensalidades.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** formata dinheiro no padrão BRL */
  const brl = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  /** formata ISO-Date → dd/mm/aaaa */
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("pt-BR");

  /** cor da badge de status */
  const statusColor = (s: string) =>
    ({
      pago:     "text-green-600",
      pendente: "text-yellow-600",
      vencido:  "text-red-600",
    }[s.toLowerCase() as keyof typeof rows] ?? "text-slate-700 dark:text-slate-300");

  /* ─────────────── effect ─────────────── */
  useEffect(() => { void fetchRows(); }, [fetchRows]);

  /* ─────────────── render ─────────────── */
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Mensalidades
          </h2>

          {/* feedbacks ------------------------------------------------- */}
          {loading && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 animate-pulse">
              Carregando mensalidades…
            </p>
          )}
          {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
          {!loading && !rows.length && !error && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nenhuma mensalidade encontrada.
            </p>
          )}

          {/* tabela ---------------------------------------------------- */}
          {!!rows.length && (
            <Card className="overflow-x-auto animate-fade-in">
              <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 text-sm">
                <thead className="bg-gray-100 dark:bg-slate-800">
                  <tr>
                    <th className="border px-4 py-2 text-left">Aluno</th>
                    <th className="border px-4 py-2 text-left">Valor</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Vencimento</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((m) => (
                    <tr
                      key={m.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <td className="border px-4 py-2">{m.aluno?.nome ?? "—"}</td>
                      <td className="border px-4 py-2">{brl(m.valor)}</td>
                      <td className={`border px-4 py-2 ${statusColor(m.status)}`}>
                        {m.status}
                      </td>
                      <td className="border px-4 py-2">{fmtDate(m.vencimento)}</td>
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
}

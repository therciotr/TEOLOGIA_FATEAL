// src/pages/Turmas.tsx
import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Turma } from '@/types/Turma';   // tipagem centralizada
import { Plus, RefreshCw } from 'lucide-react';

/* --------------------------------------------------------------------------
   Página de listagem de turmas
---------------------------------------------------------------------------*/
export default function Turmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  /* 🔄 Busca todas as turmas */
  const fetchTurmas = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Turma[]>('/turmas');
      // ordena alfabeticamente para melhor UX
      setTurmas(data.sort((a, b) => a.nome.localeCompare(b.nome)));
    } catch (err) {
      console.error('Erro ao buscar turmas:', err);
      setError('Erro ao carregar turmas.');
    } finally {
      setLoading(false);
    }
  };

  /* ⏩ primeira carga */
  useEffect(() => {
    fetchTurmas();
  }, []);

  /* ---------------------------------------------------------------------- */
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50 dark:bg-slate-900">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Turmas
        </h1>

        {/* Botão para criar nova turma (link/callback futuro) */}
        <Button
          className="gap-2 bg-indigo-600 hover:bg-indigo-700"
          onClick={() => alert('Abrir modal / rota de cadastro 🛠️')}
        >
          <Plus size={16} /> Nova turma
        </Button>
      </header>

      {/* Loading / erro / vazio ------------------------------------------------ */}
      {loading && (
        <p className="text-gray-600 dark:text-gray-300">Carregando turmas…</p>
      )}

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {!loading && turmas.length === 0 && !error && (
        <p className="text-gray-600 dark:text-gray-400">
          Nenhuma turma cadastrada.
        </p>
      )}

      {/* Grid de turmas ------------------------------------------------------- */}
      {turmas.length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {turmas.map((turma) => (
            <Card key={turma.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 space-y-1">
                <p>
                  <strong>Nome:</strong> {turma.nome}
                </p>
                <p>
                  <strong>Plano:</strong>{' '}
                  {turma.plano?.nome ?? (
                    <span className="italic text-slate-500">Sem plano</span>
                  )}
                </p>
                {/* coloque mais detalhes se quiser (quantidade de alunos, etc.) */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Botão de refresh ----------------------------------------------------- */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="gap-2" onClick={fetchTurmas}>
          <RefreshCw size={16} /> Recarregar
        </Button>
      </div>
    </div>
  );
}
import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AlunoForm from '@/components/AlunoForm';
import { getAlunos, createAluno, updateAluno } from '@/services/alunos';
import { Aluno } from '@/types/Aluno';
import { toast } from 'react-hot-toast';
import { LayoutGrid, List } from 'lucide-react';

const Alunos: React.FC = () => {
  /* ------------------------------------------------------------------ */
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [filtered, setFiltered] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'table' | 'card'>('table');

  /* ------------------------------------------------------------------ */
  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const { data } = await getAlunos();
      setAlunos(data);
      setFiltered(data);
    } catch (err) {
      toast.error('Erro ao buscar alunos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  /* ------------------------------------------------------------------ */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    setFiltered(
      alunos.filter((a) =>
        [a.nome, a.email, a.telefone].some((v) => v?.toLowerCase().includes(q))
      )
    );
  };

  const handleSave = async (formData: FormData) => {
    try {
      selectedAluno
        ? await updateAluno(selectedAluno.id, formData)
        : await createAluno(formData);

      toast.success('Aluno salvo com sucesso');
      setShowForm(false);
      fetchAlunos();
    } catch (err) {
      toast.error('Erro ao salvar aluno');
    }
  };

  /* Pré-conteúdo em caso de loading */
  if (loading)
    return (
      <main className="flex h-[80vh] items-center justify-center">
        <Spinner />
      </main>
    );

  /* ------------------------------------------------------------------ */
  return (
    <main className="min-h-screen bg-gray-50 p-6 dark:bg-slate-800">
      {/* Cabeçalho */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Alunos
        </h1>

        {/* Ações rápidas */}
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={handleSearch}
            placeholder="Buscar…"
            className="h-9 rounded border border-gray-300 px-3 text-sm
                       focus:border-primary focus:outline-none
                       dark:border-slate-600 dark:bg-slate-700
                       dark:text-slate-200"
          />
          <Button
            variant="outline"
            size="icon"
            title="Visualizar em tabela"
            onClick={() => setView('table')}
            aria-pressed={view === 'table'}
          >
            <List size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="Visualizar em cards"
            onClick={() => setView('card')}
            aria-pressed={view === 'card'}
          >
            <LayoutGrid size={18} />
          </Button>
          <Button onClick={() => (setSelectedAluno(null), setShowForm(true))}>
            Novo Aluno
          </Button>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <AlunoForm
          aluno={selectedAluno ?? undefined}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Lista de alunos */}
      {view === 'table' ? (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border border-gray-300 dark:border-slate-700">
            <thead className="bg-gray-100 dark:bg-slate-700">
              <tr>
                {[
                  'Nome',
                  'Email',
                  'Telefone',
                  'Endereço',
                  'RG',
                  'Mat. Paga',
                  'Ações',
                ].map((h) => (
                  <th key={h} className="border px-4 py-2 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((aluno) => (
                <tr
                  key={aluno.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <td className="border px-4 py-2">{aluno.nome}</td>
                  <td className="border px-4 py-2">{aluno.email}</td>
                  <td className="border px-4 py-2">
                    {aluno.telefone || '-'}
                  </td>
                  <td className="border px-4 py-2">
                    {aluno.endereco || '-'}
                  </td>
                  <td className="border px-4 py-2">{aluno.rg || '-'}</td>
                  <td className="border px-4 py-2">
                    {aluno.matriculaPaga ? '✔️' : '—'}
                  </td>
                  <td className="border px-4 py-2">
                    <Button
                      size="sm"
                      onClick={() => (
                        setSelectedAluno(aluno), setShowForm(true)
                      )}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* ---- Cards ---- */
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((aluno) => (
            <article
              key={aluno.id}
              className="relative overflow-hidden rounded-lg border
                         border-gray-300 bg-white p-4 shadow
                         transition hover:shadow-lg
                         dark:border-slate-700 dark:bg-slate-900"
            >
              {aluno.fotoUrl && (
                <img
                  src={aluno.fotoUrl}
                  alt={aluno.nome}
                  className="mb-3 h-28 w-full rounded object-cover"
                />
              )}
              <h2 className="truncate text-lg font-semibold text-gray-800 dark:text-white">
                {aluno.nome}
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {aluno.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {aluno.telefone || '-'}
              </p>

              <Button
                size="sm"
                className="mt-3"
                onClick={() => (
                  setSelectedAluno(aluno), setShowForm(true)
                )}
              >
                Editar
              </Button>

              {/* Badge matrícula */}
              <span
                className={`absolute right-3 top-3 rounded-full px-2 py-[2px] text-xs font-medium
                  ${aluno.matriculaPaga
                    ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}
              >
                {aluno.matriculaPaga ? 'Paga' : 'Pendente'}
              </span>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Alunos;
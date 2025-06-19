import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAluno } from "@/services/alunos";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Aluno } from "@/types/Aluno";
import { FileText, Printer, Download, ExternalLink } from "lucide-react";

const VisualizarAluno: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const fichaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await getAluno(id!);
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    };
    if (id) fetchAluno();
  }, [id]);

  const handleImprimir = () => {
    window.print();
  };

  const handleExportarPDF = () => {
    alert("Para exportar como PDF, use Ctrl+P e selecione 'Salvar como PDF'. (Funcionalidade avançada pode ser integrada com biblioteca como `jspdf`)");
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Ficha do Aluno
          </h1>

          {/* Botões de ação */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button onClick={() => navigate("/alunos")}>Voltar para lista</Button>
            <Button variant="outline" onClick={handleImprimir} className="flex items-center gap-2">
              <Printer size={16} /> Imprimir
            </Button>
            <Button variant="outline" onClick={handleExportarPDF} className="flex items-center gap-2">
              <Download size={16} /> Exportar PDF
            </Button>
            <a
              href={`/alunos/visualizar/${id}`}
              target="_blank"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              <ExternalLink size={16} /> Link público
            </a>
          </div>

          {/* Bloco da ficha */}
          <div
            ref={fichaRef}
            className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow max-w-2xl print:max-w-full print:shadow-none print:bg-white print:text-black"
          >
            {aluno ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Nome:</strong> {aluno.nome}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Email:</strong> {aluno.email}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Telefone:</strong> {aluno.telefone || "-"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Endereço:</strong> {aluno.endereco || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">RG:</strong> {aluno.rg || "-"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Turma:</strong> {aluno.turmaId || "-"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Matrícula Paga:</strong>{" "}
                      <span className={aluno.matriculaPaga ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {aluno.matriculaPaga ? "Sim" : "Não"}
                      </span>
                    </p>
                  </div>
                </div>

                {aluno.fotoUrl && (
                  <div>
                    <p className="text-slate-800 dark:text-white font-semibold mb-2">Foto 3x4:</p>
                    <img
                      src={aluno.fotoUrl}
                      alt="Foto do aluno"
                      className="w-28 h-28 rounded border object-cover"
                    />
                  </div>
                )}

                {aluno.documentos && aluno.documentos.length > 0 && (
                  <div>
                    <p className="text-slate-800 dark:text-white font-semibold mb-2">Documentos:</p>
                    <ul className="space-y-1">
                      {aluno.documentos.map((doc) => (
                        <li key={doc.id}>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                          >
                            <FileText className="w-4 h-4" />
                            {doc.nome}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p className="text-slate-600 dark:text-slate-300">Carregando ficha do aluno...</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VisualizarAluno;
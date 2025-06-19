import React from "react";
import { Aluno } from "@/types/Aluno";
import { useNavigate } from "react-router-dom";
import { Printer, Edit3, FileText } from "lucide-react";

interface FichaAlunoProps {
  aluno: Aluno;
}

const FichaAluno: React.FC<FichaAlunoProps> = ({ aluno }) => {
  const navigate = useNavigate();

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
          Ficha do Aluno
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/alunos/editar/${aluno.id}`)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow text-sm"
          >
            <Edit3 size={16} /> Editar
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded shadow text-sm"
          >
            <Printer size={16} /> Imprimir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
        <p><strong>Nome:</strong> {aluno.nome}</p>
        <p><strong>Email:</strong> {aluno.email}</p>
        <p><strong>Telefone:</strong> {aluno.telefone || "-"}</p>
        <p><strong>Endereço:</strong> {aluno.endereco || "-"}</p>
        <p><strong>RG:</strong> {aluno.rg || "-"}</p>
        <p><strong>Turma:</strong> {aluno.turmaId || "-"}</p>
        <p>
          <strong>Matrícula Paga:</strong>{" "}
          <span className={aluno.matriculaPaga ? "text-green-600" : "text-red-600"}>
            {aluno.matriculaPaga ? "Sim" : "Não"}
          </span>
        </p>
      </div>

      {/* Foto do aluno */}
      {aluno.fotoUrl && (
        <div>
          <strong className="block text-slate-600 dark:text-slate-200 mb-2">Foto 3x4:</strong>
          <img
            src={aluno.fotoUrl}
            alt="Foto do aluno"
            className="w-24 h-24 rounded-lg border object-cover"
          />
        </div>
      )}

      {/* Timeline de documentos */}
      {aluno.documentos && aluno.documentos.length > 0 && (
        <div>
          <strong className="block text-slate-600 dark:text-slate-200 mb-2">Documentos Enviados:</strong>
          <ol className="relative border-l border-gray-300 dark:border-gray-600">
            {aluno.documentos.map((doc) => (
              <li key={doc.id} className="mb-4 ml-4">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white dark:border-gray-800"></div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
                  <FileText size={16} />
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {doc.nome}
                  </a>
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default FichaAluno;
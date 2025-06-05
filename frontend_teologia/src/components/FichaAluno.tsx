// src/components/FichaAluno.tsx

import React from "react";
import { Aluno } from "@/types/Aluno"; // ✅ Importa a interface Aluno (tipagem)

/**
 * Componente de visualização (read-only) da ficha do aluno.
 * Exibe as principais informações, foto e documentos.
 */
interface FichaAlunoProps {
  aluno: Aluno;
}

const FichaAluno: React.FC<FichaAlunoProps> = ({ aluno }) => {
  return (
    <div className="space-y-4 bg-white rounded p-4 shadow">
      {/* Informações principais */}
      <p><strong>Nome:</strong> {aluno.nome}</p>
      <p><strong>Email:</strong> {aluno.email}</p>
      <p><strong>Telefone:</strong> {aluno.telefone || "-"}</p>
      <p><strong>Endereço:</strong> {aluno.endereco || "-"}</p>
      <p><strong>RG:</strong> {aluno.rg || "-"}</p>
      <p><strong>Turma:</strong> {aluno.turmaId || "-"}</p>

      {/* Status de matrícula */}
      <p>
        <strong>Matrícula Paga:</strong>{" "}
        {aluno.matriculaPaga ? "Sim" : "Não"}
      </p>

      {/* Foto do aluno */}
      {aluno.fotoUrl && (
        <div>
          <strong>Foto 3x4:</strong>
          <img
            src={aluno.fotoUrl}
            alt="Foto do aluno"
            className="w-24 h-24 rounded mt-2 object-cover"
          />
        </div>
      )}

      {/* Lista de documentos anexados */}
      {aluno.documentos && aluno.documentos.length > 0 && (
        <div>
          <strong>Documentos:</strong>
          <ul className="list-disc pl-4">
            {aluno.documentos.map((doc) => (
              <li key={doc.id}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {doc.nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FichaAluno;
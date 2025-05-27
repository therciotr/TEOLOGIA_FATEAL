import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getAlunos } from "../services/api";

interface Aluno {
  id: number;
  nome: string;
  email: string;
  turma: string;
}

const Alunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    getAlunos().then(setAlunos);
  }, []);

  return (
    <div className="app-layout">
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h2>Lista de Alunos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Turma</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map(aluno => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td>{aluno.turma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Alunos;
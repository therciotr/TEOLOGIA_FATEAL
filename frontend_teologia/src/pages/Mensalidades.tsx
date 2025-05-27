import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getMensalidades } from "../services/api";

interface Mensalidade {
  id: number;
  aluno: string;
  valor: number;
  status: string;
  vencimento: string;
}

const Mensalidades: React.FC = () => {
  const [mensalidades, setMensalidades] = useState<Mensalidade[]>([]);

  useEffect(() => {
    getMensalidades().then(setMensalidades);
  }, []);

  return (
    <div className="app-layout">
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h2>Mensalidades</h2>
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Vencimento</th>
              </tr>
            </thead>
            <tbody>
              {mensalidades.map(m => (
                <tr key={m.id}>
                  <td>{m.aluno}</td>
                  <td>R$ {m.valor.toFixed(2)}</td>
                  <td>{m.status}</td>
                  <td>{m.vencimento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Mensalidades;
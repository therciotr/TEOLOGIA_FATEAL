import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Relatorios: React.FC = () => (
  <div className="app-layout">
    <Navbar />
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <h2>Relatórios</h2>
        <p>Exportar relatórios em PDF ou Excel.</p>
        {/* Botões e lógica de exportação podem ser adicionados aqui */}
      </main>
    </div>
  </div>
);

export default Relatorios;
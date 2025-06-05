// src/components/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Sidebar - Menu lateral de navegação do sistema.
 * Mostra links para as páginas principais.
 * 
 * Observação:
 * ✅ Não lida diretamente com dados (como Aluno, Mensalidade, etc.).
 * ✅ Apenas usa navegação (não precisa importar tipos adicionais de /types).
 */
const Sidebar: React.FC = () => (
  <aside className="sidebar">
    <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/alunos">Alunos</Link></li>
      <li><Link to="/mensalidades">Mensalidades</Link></li>
      <li><Link to="/relatorios">Relatórios</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
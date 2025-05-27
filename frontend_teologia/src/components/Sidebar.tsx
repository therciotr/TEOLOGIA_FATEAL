import React from "react";
import { Link } from "react-router-dom";

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
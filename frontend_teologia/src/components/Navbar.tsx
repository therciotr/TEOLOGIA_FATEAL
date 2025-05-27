import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/alunos">Alunos</Link></li>
      <li><Link to="/mensalidades">Mensalidades</Link></li>
      <li><Link to="/relatorios">Relatórios</Link></li>
      <li style={{ float: "right" }}><Link to="/login">Sair</Link></li>
    </ul>
  </nav>
);

export default Navbar;
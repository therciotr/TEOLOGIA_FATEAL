// src/components/Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar bg-indigo-600 dark:bg-slate-900 px-6 py-3 shadow flex items-center justify-between text-white">
      <ul className="flex gap-6 items-center">
        <li><Link to="/" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/alunos" className="hover:underline">Alunos</Link></li>
        <li><Link to="/mensalidades" className="hover:underline">Mensalidades</Link></li>
        <li><Link to="/relatorios" className="hover:underline">Relatórios</Link></li>
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100 transition"
      >
        <LogOut size={16} />
        <span>Sair</span>
      </button>
    </nav>
  );
};

export default Navbar;
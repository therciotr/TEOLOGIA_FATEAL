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
    <nav className="navbar flex items-center justify-between text-white shadow"
         style={{ padding: "0.75rem 1.5rem" /* py-3 px-6 */, backgroundColor: "var(--color-primary)" }}>
      <ul className="flex items-center" style={{ gap: "1.5rem" /* gap-6 */ }}>
        <li><Link to="/" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/alunos" className="hover:underline">Alunos</Link></li>
        <li><Link to="/mensalidades" className="hover:underline">Mensalidades</Link></li>
        <li><Link to="/relatorios" className="hover:underline">Relatórios</Link></li>
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center rounded transition bg-white text-indigo-600 hover:bg-gray-100"
        style={{ padding: "0.25rem 0.75rem", gap: "0.5rem" /* py-1 px-3, gap-2 */ }}
      >
        <LogOut size={16} />
        <span>Sair</span>
      </button>
    </nav>
  );
};

export default Navbar;

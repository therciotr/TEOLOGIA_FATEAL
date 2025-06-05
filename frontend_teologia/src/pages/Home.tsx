import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

/**
 * Página inicial (Home) do sistema.
 * Integra Navbar, Sidebar e Dashboard em um layout bonito e responsivo.
 */
const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar fixa no topo */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar à esquerda */}
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Bem-vindo ao Painel!
          </h1>

          {/* Dashboard com métricas e ações rápidas */}
          <Dashboard />

          {/* Rodapé bonito e discreto */}
          <footer className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Teologia FATEAL. Todos os direitos reservados.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;
import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

/**
 * Página inicial (Home) do sistema.
 * Layout moderno com Sidebar, Navbar e Dashboard responsivo.
 */
const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Sidebar (desktop + mobile) */}
      <Sidebar isOpen={true} toggle={() => {}} />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar superior */}
        <Navbar toggleTheme={() => {}} dark={false} />

        {/* Conteúdo da dashboard */}
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Painel!</h1>

          {/* Cards de dashboard */}
          <Dashboard />

          {/* Rodapé discreto */}
          <footer className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Teologia FATEAL. Todos os direitos reservados.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

/**
 * Página inicial (Home) do sistema Teologia FATEAL.
 * Interface moderna com layout responsivo, suporte a tema escuro e controle da sidebar.
 */
const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Aplica/remova a classe 'dark' no <html> globalmente
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">

      {/* Sidebar lateral responsiva */}
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Barra superior com botão de alternância de tema */}
        <Navbar toggleTheme={toggleTheme} dark={darkMode} />

        {/* Conteúdo central */}
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Painel!</h1>

          {/* Dashboard com gráficos ou cards */}
          <Dashboard />

          {/* Rodapé com ano dinâmico */}
          <footer className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Teologia FATEAL. Todos os direitos reservados.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;

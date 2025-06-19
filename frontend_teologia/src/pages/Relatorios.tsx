import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button";

/**
 * Página de Relatórios.
 * Mostra opções para exportação e estrutura clara e responsiva.
 */
const Relatorios: React.FC = () => {
  const handleExportPDF = async () => {
    try {
      // 🔄 Substitua com chamada real
      // const response = await api.get("/relatorios/pdf", { responseType: 'blob' });
      alert("Exportação em PDF iniciada! (placeholder)");
    } catch (err) {
      console.error("Erro ao exportar PDF", err);
    }
  };

  const handleExportExcel = async () => {
    try {
      // 🔄 Substitua com chamada real
      // const response = await api.get("/relatorios/excel", { responseType: 'blob' });
      alert("Exportação em Excel iniciada! (placeholder)");
    } catch (err) {
      console.error("Erro ao exportar Excel", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Barra de navegação */}
      <Navbar />

      <div className="flex flex-1">
        {/* Barra lateral */}
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
            Relatórios
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Exporte relatórios em PDF ou Excel de forma simples e rápida.
          </p>

          {/* Botões de exportação */}
          <div className="flex flex-wrap gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400"
              onClick={handleExportPDF}
              aria-label="Exportar relatório em PDF"
            >
              Exportar PDF
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
              onClick={handleExportExcel}
              aria-label="Exportar relatório em Excel"
            >
              Exportar Excel
            </Button>
          </div>

          {/* Rodapé bonito e responsivo */}
          <footer className="mt-12 text-center text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Teologia FATEAL. Todos os direitos reservados.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
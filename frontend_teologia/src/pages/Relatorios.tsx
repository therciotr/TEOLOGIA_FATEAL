import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button";
import { Aluno } from "@/types/Aluno"; // 👈 Importa o tipo correto!
import { Mensalidade } from "@/types/Mensalidade"; // 👈 Importa o tipo correto!

/**
 * Página de Relatórios.
 * Mostra opções para exportação e estrutura clara e responsiva.
 */
const Relatorios: React.FC = () => {
  /**
   * Função para exportar relatórios em PDF.
   * Aqui você pode integrar com sua API de geração de relatórios.
   */
  const handleExportPDF = () => {
    // Chame a API real aqui (ex: api.get("/relatorios/pdf"))
    alert("Exportação em PDF iniciada! (placeholder)");
  };

  /**
   * Função para exportar relatórios em Excel.
   */
  const handleExportExcel = () => {
    // Chame a API real aqui (ex: api.get("/relatorios/excel"))
    alert("Exportação em Excel iniciada! (placeholder)");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegação */}
      <Navbar />

      <div className="flex flex-1">
        {/* Barra lateral */}
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Relatórios</h2>
          <p className="mb-6 text-gray-600">
            Exporte relatórios em PDF ou Excel de forma simples e rápida.
          </p>

          {/* Botões de exportação */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleExportPDF}
            >
              Exportar PDF
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleExportExcel}
            >
              Exportar Excel
            </Button>
          </div>

          {/* Rodapé para polimento visual */}
          <footer className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Teologia FATEAL. Todos os direitos reservados.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
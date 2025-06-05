import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Alunos from "@/pages/alunos";
import EditarAluno from "@/pages/alunos/editar";
import VisualizarAluno from "@/pages/alunos/visualizar";
import Mensalidades from "@/pages/Mensalidades";
import Pagamentos from "@/pages/Pagamentos";
import Planos from "@/pages/Planos";
import Relatorios from "@/pages/Relatorios";
import Responsaveis from "@/pages/Responsaveis";
import Turmas from "@/pages/Turmas";
import Login from "@/pages/Login";

/**
 * Arquivo de rotas principais do projeto.
 * Organiza as rotas para todas as páginas, incluindo as novas de alunos.
 */
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota inicial */}
        <Route path="/" element={<Home />} />

        {/* Rotas dos alunos */}
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/alunos/editar/:id" element={<EditarAluno />} />
        <Route path="/alunos/visualizar/:id" element={<VisualizarAluno />} />
        {/* Caso queira ter um cadastro de alunos separado */}
        {/* <Route path="/alunos/cadastrar" element={<CadastrarAluno />} /> */}

        {/* Outras rotas */}
        <Route path="/mensalidades" element={<Mensalidades />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/responsaveis" element={<Responsaveis />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/login" element={<Login />} />

        {/* Página 404 personalizada (opcional) */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
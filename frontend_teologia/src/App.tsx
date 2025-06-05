import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas principais
import Home from "./pages/Home";
import Login from "./pages/Login";
import Alunos from "./pages/alunos"; // Agora fica em src/pages/alunos/index.tsx
import EditarAluno from "./pages/alunos/editar";
import VisualizarAluno from "./pages/alunos/visualizar";
import Mensalidades from "./pages/Mensalidades";
import Relatorios from "./pages/Relatorios";
import Pagamentos from "./pages/Pagamentos";
import Planos from "./pages/Planos";
import Responsaveis from "./pages/Responsaveis";
import Turmas from "./pages/Turmas";

// Serviço para verificar autenticação do usuário
import { isAuthenticated } from "./services/auth";

/**
 * Componente para proteger rotas privadas.
 * Redireciona para o login se o usuário não estiver autenticado.
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

/**
 * Arquivo App.tsx principal do projeto.
 * Define as rotas e protege com PrivateRoute onde necessário.
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota de login (pública) */}
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas (somente autenticados) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/alunos"
          element={
            <PrivateRoute>
              <Alunos />
            </PrivateRoute>
          }
        />
        <Route
          path="/alunos/editar/:id"
          element={
            <PrivateRoute>
              <EditarAluno />
            </PrivateRoute>
          }
        />
        <Route
          path="/alunos/visualizar/:id"
          element={
            <PrivateRoute>
              <VisualizarAluno />
            </PrivateRoute>
          }
        />
        <Route
          path="/mensalidades"
          element={
            <PrivateRoute>
              <Mensalidades />
            </PrivateRoute>
          }
        />
        <Route
          path="/pagamentos"
          element={
            <PrivateRoute>
              <Pagamentos />
            </PrivateRoute>
          }
        />
        <Route
          path="/planos"
          element={
            <PrivateRoute>
              <Planos />
            </PrivateRoute>
          }
        />
        <Route
          path="/relatorios"
          element={
            <PrivateRoute>
              <Relatorios />
            </PrivateRoute>
          }
        />
        <Route
          path="/responsaveis"
          element={
            <PrivateRoute>
              <Responsaveis />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas"
          element={
            <PrivateRoute>
              <Turmas />
            </PrivateRoute>
          }
        />

        {/* Página 404 padrão para rotas inexistentes */}
        <Route
          path="*"
          element={
            <h1 className="text-center text-2xl text-red-600 mt-10">
              404 - Página não encontrada
            </h1>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
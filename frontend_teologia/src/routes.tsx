import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PrivateLayout from '@/layouts/PrivateLayout';
import { isAuthenticated } from '@/services/auth';

/* ─────────── Lazy‑load pages ─────────── */
const Home            = lazy(() => import('@/pages/Home'));
const Alunos          = lazy(() => import('@/pages/alunos'));
const EditarAluno     = lazy(() => import('@/pages/alunos/editar'));
const VisualizarAluno = lazy(() => import('@/pages/alunos/visualizar'));
const Mensalidades    = lazy(() => import('@/pages/Mensalidades'));
const Pagamentos      = lazy(() => import('@/pages/Pagamentos'));
const Planos          = lazy(() => import('@/pages/Planos'));
const Relatorios      = lazy(() => import('@/pages/Relatorios'));
const Responsaveis    = lazy(() => import('@/pages/Responsaveis'));
const Turmas          = lazy(() => import('@/pages/Turmas'));
const Login           = lazy(() => import('@/pages/Login'));
const RecuperarSenha  = lazy(() => import('@/pages/RecuperarSenha'));

/* ─────────── Rota protegida ─────────── */
const PrivateRoute = ({ children }: { children: JSX.Element }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

/* ─────────── AppRoutes ─────────── */
const AppRoutes: React.FC = () => (
  <Router>
    <Suspense fallback={<div className="p-8 text-center">Carregando…</div>}>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />

        {/* Rotas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="alunos" element={<Alunos />} />
          <Route path="alunos/editar/:id" element={<EditarAluno />} />
          <Route path="alunos/visualizar/:id" element={<VisualizarAluno />} />
          <Route path="mensalidades" element={<Mensalidades />} />
          <Route path="pagamentos" element={<Pagamentos />} />
          <Route path="planos" element={<Planos />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="responsaveis" element={<Responsaveis />} />
          <Route path="turmas" element={<Turmas />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1 className="text-center mt-20 text-2xl text-red-600">404 – Página não encontrada</h1>} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
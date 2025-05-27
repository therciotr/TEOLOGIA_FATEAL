// Opcional: se quiser organizar as rotas separadamente, senão use direto no App.tsx
// Aqui um exemplo básico de export de rotas

import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Alunos from "./pages/Alunos";
import Mensalidades from "./pages/Mensalidades";
import Relatorios from "./pages/Relatorios";

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/alunos", element: <Alunos /> },
  { path: "/mensalidades", element: <Mensalidades /> },
  { path: "/relatorios", element: <Relatorios /> }
];
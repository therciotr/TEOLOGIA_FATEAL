import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Alunos from "./pages/Alunos";
import Mensalidades from "./pages/Mensalidades";
import Relatorios from "./pages/Relatorios";
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/alunos" element={<PrivateRoute><Alunos /></PrivateRoute>} />
      <Route path="/mensalidades" element={<PrivateRoute><Mensalidades /></PrivateRoute>} />
      <Route path="/relatorios" element={<PrivateRoute><Relatorios /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default App;
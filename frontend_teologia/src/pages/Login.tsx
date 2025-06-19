import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../services/auth";

/**
 * Página de Login do sistema com animação, responsividade e dark mode.
 */
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(undefined);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("Erro de login:", err);
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md bg-white dark:bg-slate-800 animate-fade-in">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Bem-vindo de volta!
        </h1>

        <LoginForm onLogin={handleLogin} loading={loading} error={error} />

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} Teologia FATEAL. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
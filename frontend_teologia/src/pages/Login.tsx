import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../services/auth";

/**
 * Página de Login do sistema.
 * Usa componente LoginForm para coletar credenciais e gerenciar estado de carregamento e erros.
 */
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false); // Estado para exibir spinner de carregamento
  const [error, setError] = useState<string | undefined>(); // Estado para exibir mensagem de erro
  const navigate = useNavigate(); // Para redirecionar após login

  /**
   * Função para lidar com o envio do formulário de login.
   * Faz chamada ao serviço de autenticação e redireciona se for bem-sucedido.
   */
  const handleLogin = async (email: string, password: string) => {
    setLoading(true); // Ativa feedback visual de carregamento
    setError(undefined); // Limpa erros anteriores

    try {
      await login(email, password); // Chamada real à API de login
      navigate("/"); // Redireciona para a Home se login for bem-sucedido
    } catch (err) {
      console.error("Erro de login:", err);
      setError("Credenciais inválidas. Verifique seu e-mail e senha."); // Mensagem amigável
    } finally {
      setLoading(false); // Desativa o loading mesmo em caso de erro
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Bem-vindo de volta!
        </h1>

        {/* Componente reutilizável para o formulário de login */}
        <LoginForm onLogin={handleLogin} loading={loading} error={error} />

        {/* Rodapé com links ou informações adicionais */}
        <p className="mt-4 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Teologia FATEAL
        </p>
      </div>
    </div>
  );
};

export default Login;
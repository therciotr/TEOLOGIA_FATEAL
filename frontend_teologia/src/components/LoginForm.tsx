import React, { useState } from "react";

interface Props {
  onLogin: (email: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<Props> = ({ onLogin, loading = false, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-indigo-600 dark:text-white">Acesso ao Sistema</h2>

      {error && (
        <div className="text-sm text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 p-2 rounded">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
          Senha
        </label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;
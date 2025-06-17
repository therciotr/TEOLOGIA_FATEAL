// src/pages/RecuperarSenha.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { forgotPassword } from '@/services/auth';

const RecuperarSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      await forgotPassword(email);
      setEnviado(true);
    } catch (err: any) {
      console.error(err);
      setErro(err?.message || 'Erro ao enviar e-mail. Tente novamente mais tarde.');
    }
  };

  if (enviado) {
    return (
      <div className="max-w-md mx-auto mt-24 p-6 text-center space-y-4 bg-white dark:bg-slate-800 rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
          Verifique sua caixa de entrada 📧
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Enviamos um link de recuperação para <strong>{email}</strong>.
        </p>
        <Button onClick={() => navigate('/login')}>Voltar ao login</Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-24 bg-white dark:bg-slate-800 p-8 rounded-xl shadow space-y-6"
    >
      <h1 className="text-2xl font-semibold text-center text-slate-800 dark:text-slate-100">
        Recuperar senha
      </h1>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        E-mail cadastrado
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-label="Digite seu e-mail"
          className="mt-2 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="voce@exemplo.com"
        />
      </label>

      {erro && (
        <p className="text-sm text-red-600 dark:text-red-400">{erro}</p>
      )}

      <Button type="submit" className="w-full gap-2">
        <Mail size={16} /> Enviar link
      </Button>

      <p
        onClick={() => navigate('/login')}
        className="text-sm text-center text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline transition"
      >
        Voltar ao login
      </p>
    </form>
  );
};

export default RecuperarSenha;
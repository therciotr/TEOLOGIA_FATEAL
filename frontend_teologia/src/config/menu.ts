// src/config/menu.ts
import {
  Home,
  Users,
  FileText,
  CreditCard,
  Layers,
  BookOpen,
  DollarSign,
  Shield,
  MailQuestion,
  Lock,
} from 'lucide-react';

import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
  section: string;
  public?: boolean;
}

export const menuItems: MenuItem[] = [
  // 🔹 GERAL
  { label: 'Início', path: '/', icon: Home, section: 'Geral' },

  // 📘 ACADÊMICO
  { label: 'Alunos', path: '/alunos', icon: Users, section: 'Acadêmico' },
  { label: 'Turmas', path: '/turmas', icon: BookOpen, section: 'Acadêmico' },
  { label: 'Responsáveis', path: '/responsaveis', icon: Shield, section: 'Acadêmico' },

  // 💰 FINANCEIRO
  { label: 'Mensalidades', path: '/mensalidades', icon: FileText, section: 'Financeiro' },
  { label: 'Pagamentos', path: '/pagamentos', icon: DollarSign, section: 'Financeiro' },
  { label: 'Planos', path: '/planos', icon: Layers, section: 'Financeiro' },

  // 📊 RELATÓRIOS E ANÁLISES
  { label: 'Relatórios', path: '/relatorios', icon: FileText, section: 'Relatórios' },

  // 🌐 PÚBLICO
  { label: 'Recuperar Senha', path: '/recuperar-senha', icon: MailQuestion, section: 'Público', public: true },
];
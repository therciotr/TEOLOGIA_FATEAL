import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/config/menu';

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

// Organiza os itens por seção (opcional)
const sections = [
  {
    title: 'Geral',
    items: menuItems.filter((item) => !item.public).slice(0, 3), // Dashboard, Alunos, Mensalidades
  },
  {
    title: 'Administração',
    items: menuItems.filter((item) => !item.public).slice(3), // Relatórios, Pagamentos, etc.
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const sidebarVariants = {
    closed: { x: '-100%' },
    open: { x: 0 },
  };

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggle();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [toggle]);

  return (
    <>
      {/* Botão hambúrguer (mobile) */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggle}
        aria-label="Abrir menu"
      >
        <Menu size={22} />
      </Button>

      {/* Overlay escuro para mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
            className="fixed inset-0 z-30 bg-black bg-opacity-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed lg:static z-40 w-64 h-full bg-slate-800 dark:bg-slate-900 text-white p-6 flex flex-col gap-6 shadow-lg lg:shadow-none"
          >
            <h2 className="text-lg font-bold tracking-wide text-white">
              Painel FATEAL
            </h2>

            {/* Navegação organizada por seções */}
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                  {section.title}
                </p>
                <ul className="space-y-2">
                  {section.items.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        onClick={toggle} // Fecha no mobile
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-300 hover:bg-slate-700'
                          }`
                        }
                      >
                        <Icon size={18} />
                        <span className="hidden lg:inline">{label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
import React, {
  useState,
  useEffect,
  Suspense,
  ReactNode,
  useCallback,
} from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  NavigateFunction,
} from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { LogOut, Moon, Sun, Menu as MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------
  Helpers
------------------------------------------------------------ */
const isDesktop = () => window.innerWidth >= 1024;

/* ------------------------------------------------------------
  Navbar
------------------------------------------------------------ */
type NavbarProps = {
  dark: boolean;
  toggleTheme: () => void;
  openSidebar: () => void;
  navigate: NavigateFunction;
};

const Navbar: React.FC<NavbarProps> = ({
  dark,
  toggleTheme,
  openSidebar,
  navigate,
}) => {
  const userName = localStorage.getItem('userName') ?? 'Usuário';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shadow dark:border-slate-700 dark:bg-slate-900 lg:px-6">
      {/* Botão hambúrguer mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Abrir menu"
        title="Abrir menu"
        onClick={openSidebar}
      >
        <MenuIcon size={20} />
      </Button>

      <span className="truncate text-sm font-semibold text-slate-600 dark:text-slate-200 lg:text-base">
        Bem-vindo,&nbsp;{userName}
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Alternar tema"
          title="Tema"
          onClick={toggleTheme}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          aria-label="Sair"
          title="Sair"
          onClick={handleLogout}
        >
          <LogOut size={16} /> Sair
        </Button>
      </div>
    </header>
  );
};

/* ------------------------------------------------------------
  PrivateLayout
------------------------------------------------------------ */
const PrivateLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* -------------------- Autenticação -------------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  /* -------------------- Tema --------------------------- */
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = () => setDark((p) => !p);

  /* -------------------- Sidebar ------------------------ */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fecha o drawer quando redimensiona para desktop
  useEffect(() => {
    const handleResize = () => isDesktop() && setSidebarOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fecha o drawer ao trocar rota (somente mobile)
  useEffect(() => {
    if (!isDesktop()) setSidebarOpen(false);
  }, [location.pathname]);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  /* -------------------- Layout ------------------------- */
  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} close={closeSidebar} />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          dark={dark}
          toggleTheme={toggleTheme}
          openSidebar={openSidebar}
          navigate={navigate}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <Suspense
                fallback={
                  <div className="text-center text-slate-400">Carregando…</div>
                }
              >
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
import React, {
  useState,
  useEffect,
  Suspense,
  useCallback,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { LogOut, Moon, Sun, Menu as MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getUser, logout } from '@/services/auth';
import { Spinner } from '@/components/ui/spinner';

const isDesktop = () => window.innerWidth >= 1024;

const Navbar: React.FC<{
  dark: boolean;
  toggleTheme: () => void;
  openSidebar: () => void;
  navigate: ReturnType<typeof useNavigate>;
}> = ({ dark, toggleTheme, openSidebar, navigate }) => {
  const user = getUser();
  const userName = user?.nome ?? 'Usuário';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shadow dark:border-slate-700 dark:bg-slate-900 lg:px-6">
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

const PrivateLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    return stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    if (dark) {
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => isDesktop() && setSidebarOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop()) setSidebarOpen(false);
  }, [location.pathname]);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark">
      <Sidebar isOpen={sidebarOpen} close={closeSidebar} />

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
              <Suspense fallback={<Spinner className="mx-auto mt-10 h-8 w-8" />}>
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

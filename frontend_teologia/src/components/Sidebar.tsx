import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/config/menu";

// Se quiser agrupar de maneira diferente, basta alterar esta função
const getSections = () => [
  {
    title: "Geral",
    items: menuItems.filter((i) => !i.public).slice(0, 3),
  },
  {
    title: "Administração",
    items: menuItems.filter((i) => !i.public).slice(3),
  },
];

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  /* ------------------------------------------------------------------ */
  /* Keyboard ESC → fecha drawer apenas em telas pequenas                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && window.innerWidth < 1024) toggle();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, toggle]);

  /* ------------------------------------------------------------------ */
  /* Framer Motion variants                                             */
  /* ------------------------------------------------------------------ */
  const drawer = {
    hidden: { x: "-100%" },
    show: { x: 0 },
    exit: { x: "-100%" },
  };

  const sections = getSections();

  return (
    <>
      {/* Botão hambúrguer (só aparece em telas < lg) */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label="Abrir menu"
      >
        <Menu size={22} />
      </Button>

      {/* Overlay escurecido — fecha ao clicar fora */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggle}
            tabIndex={-1}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.aside
            key="sidebar"
            role="navigation"
            className="fixed lg:static z-50 w-64 h-full bg-slate-800 dark:bg-slate-900 text-white p-6 flex flex-col gap-6 shadow-lg lg:shadow-none"
            variants={drawer}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <h2 className="text-lg font-bold tracking-wide">Painel FATEAL</h2>

            {sections.map(({ title, items }) => (
              <section key={title}>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                  {title}
                </p>

                <ul className="space-y-2">
                  {items.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end
                        onClick={() => window.innerWidth < 1024 && toggle()}
                        className={({ isActive }) =>
                          [
                            "flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200",
                            isActive
                              ? "bg-indigo-600 text-white"
                              : "text-slate-300 hover:bg-slate-700",
                          ].join(" ")
                        }
                      >
                        <Icon size={18} aria-hidden />
                        <span className="hidden lg:inline">{label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

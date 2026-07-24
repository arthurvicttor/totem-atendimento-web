import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/utils/cn";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { path: "/admin/products", label: "Produtos", icon: "lunch_dining" },
  { path: "/admin/categories", label: "Categorias", icon: "category" },
  { path: "/admin/orders", label: "Pedidos", icon: "receipt_long" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="w-64 shrink-0 bg-surface border-r-4 border-on-surface flex flex-col">
        {/* Logo */}
        <div className="h-24 flex items-center px-6 border-b-4 border-on-surface shrink-0">
          <span className="font-black text-xl text-primary tracking-tight">
            BurgerFast
          </span>
          <span className="ml-2 bg-primary text-on-primary text-xs font-bold px-2 py-0.5 uppercase">
            Admin
          </span>
        </div>

        {/* Navegação */}
        <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-4 px-4 py-4 font-bold text-sm uppercase transition-all duration-150 text-left w-full",
                  isActive
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container",
                )}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Usuário + logout */}
        <div className="border-t-4 border-on-surface p-4 shrink-0">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center font-black text-lg shrink-0">
              {user?.name?.charAt(0).toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-sm text-on-surface truncate">
                {user?.name ?? "Admin"}
              </p>
              <p className="text-xs text-on-surface-variant truncate">
                {user?.email ?? ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase text-on-surface-variant hover:bg-surface-container hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Sair
          </button>
        </div>
      </aside>

      {/* ── Conteúdo principal ──────────────────────────── */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </main>

      {/* ── Modal de confirmação de logout ──────────────── */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-on-surface/60 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border-4 border-on-surface p-8 w-full max-w-sm flex flex-col gap-6"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <span
                  className="material-symbols-outlined text-5xl text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  logout
                </span>
                <h3 className="font-black text-2xl text-on-surface">
                  Sair do sistema?
                </h3>
                <p className="text-on-surface-variant text-sm">
                  Você precisará fazer login novamente para acessar o painel.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-4 border-4 border-on-surface font-bold text-sm uppercase hover:bg-surface-container transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-4 bg-primary text-on-primary font-bold text-sm uppercase hover:brightness-110 transition-all active:scale-95"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

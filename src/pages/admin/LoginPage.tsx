import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/authStore";

// Credenciais mock enquanto o backend não está pronto
const MOCK_USER = {
  email: "admin@burgerfast.com",
  password: "123456",
  user: {
    id: "1",
    name: "Arthur Admin",
    email: "admin@burgerfast.com",
    role: "ADMIN" as const,
  },
  token: "mock-jwt-token",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simula delay de API
    await new Promise((r) => setTimeout(r, 1000));

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      login(MOCK_USER.user, MOCK_USER.token);
      navigate("/admin/dashboard");
    } else {
      setError("E-mail ou senha incorretos");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-black text-4xl text-primary tracking-tight">
            BurgerFast
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Painel Administrativo
          </p>
        </div>

        {/* Card de login */}
        <div className="bg-surface border-4 border-on-surface p-8 flex flex-col gap-6">
          <div>
            <h2 className="font-black text-2xl text-on-surface">Entrar</h2>
            <p className="text-on-surface-variant text-sm mt-1">
              Use: admin@burgerfast.com / 123456
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-on-surface uppercase">
                E-mail
              </label>
              <div className="flex items-center border-4 border-on-surface bg-surface focus-within:border-primary transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant px-3">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="flex-1 py-4 pr-4 bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant text-sm"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-on-surface uppercase">
                Senha
              </label>
              <div className="flex items-center border-4 border-on-surface bg-surface focus-within:border-primary transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant px-3">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  className="flex-1 py-4 bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-3 text-sm font-bold"
              >
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </motion.div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-5 font-black text-base uppercase flex items-center justify-center gap-3 active:scale-95 transition-transform hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="material-symbols-outlined"
                  >
                    progress_activity
                  </motion.span>
                  Entrando...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>

        {/* Link para o totem */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-on-surface-variant text-sm hover:text-on-surface transition-colors flex items-center gap-1 mx-auto"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Voltar ao totem
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const navigate = useNavigate();

  // Efeito parallax no background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      const bg = document.querySelector('[data-alt*="burger"]') as HTMLElement;
      if (bg) {
        bg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
      }
    };

    // Auto-refresh após inatividade (padrão para quiosques)
    let timeout: ReturnType<typeof setTimeout>;
    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Lógica de reset pode ser adicionada aqui
        console.log("Inatividade detectada");
      }, 60000); // 1 minuto
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keypress", resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface overflow-hidden h-screen w-screen selection:bg-primary-fixed">
      <div className="relative w-full h-full flex flex-col items-center justify-between py-10 px-10">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center scale-105 transform"
            data-alt="Hambúrguer gourmet hiper-realista com múltiplas camadas de carne grelhada, queijo cheddar derretido, alface crocante e tomates maduros"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfgSZvjSkPUtN2WcGKqeV5WKKB050OZC5m4tLtEOWUYflSvj0kBvu_7hC9mLQ1kh8KsO1LAVeg2D4TMjI7yJr8lHUi7gZ8tKoLMqcFuDmzvrKx3N-f-JOpOziKv5Bdx6py9RuYw3o3OCil3in4ECmNyvp3XL5WW9ifhHF39svO-5Eqml2nEwQIk9t4PlHtQywt7AY4a9vkYmTaLcTlyQ5q2--qSecmMHszAQh9h864e9h_e0M3fqic_e3w5duWsEjFz09V5rpDg54')",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/60" />
        </div>

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full flex justify-center items-center"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-headline-lg text-headline-lg font-black text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tighter uppercase">
              Crazy Taste
            </span>
            <span className="font-label-xl text-label-xl text-on-primary-fixed uppercase tracking-widest px-4 py-1 bg-primary rounded-sm">
              Burger &amp; Grill
            </span>
          </div>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center justify-center text-center"
        >
          <div className="mb-12">
            <h1 className="font-display-xl text-display-xl text-on-primary mb-4 text-shadow-lg">
              COM
              <br />
              FOME?
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary max-w-md mx-auto opacity-90">
              Ingredientes frescos, serviço ultra rápido. Sua refeição perfeita
              está a apenas um toque de distância.
            </p>
          </div>

          <button
            onClick={() => navigate("/menu")}
            className="group relative flex items-center justify-center bg-primary text-on-primary font-headline-md text-headline-md h-32 px-24 rounded-full shadow-2xl transition-all duration-300 active:scale-95 animate-pulse-gentle hover:bg-primary-container overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 uppercase">Toque para Começar</span>
            <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </button>
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 w-full flex justify-between items-end"
        ></motion.footer>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" />

      <style>{`
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        .text-shadow-lg {
          text-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}

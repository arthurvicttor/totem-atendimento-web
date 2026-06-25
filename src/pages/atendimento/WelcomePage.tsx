import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingBag } from "lucide-react";
import { useOrderStore } from "@/stores/orderStore";
import type { OrderType } from "@/types";

export default function WelcomePage() {
  const navigate = useNavigate();
  const setOrderType = useOrderStore((s) => s.setOrderType);

  function handleSelectType(type: OrderType) {
    setOrderType(type);
    navigate("/menu");
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Banner topo */}
      <div className="h-48 bg-gradient-to-r from-amber-900 to-amber-700 flex items-center justify-between px-8">
        <div>
          <p className="text-brand-secondary font-black text-xs uppercase tracking-widest">
            Oferta do dia
          </p>
          <h1 className="text-white font-black text-3xl leading-tight">
            X-BURGUER
            <br />
            <span className="text-brand-secondary">+ FRITAS</span>
          </h1>
          <p className="text-white/70 text-sm mt-1">Por apenas R$ 29,90</p>
        </div>
        <span className="text-8xl drop-shadow-2xl">🍔</span>
      </div>

      {/* Logo + saudação */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-4 bg-white border-b border-gray-100"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-3xl">🍔</span>
          <h2 className="text-brand-dark font-black text-3xl">
            BURGER<span className="text-brand-primary">FAST</span>
          </h2>
        </div>
        <p className="text-brand-muted text-sm">Faça seu pedido rapidinho!</p>
      </motion.div>

      {/* Chamada */}
      <div className="px-6 pt-8 pb-4">
        <h3 className="text-brand-dark font-black text-2xl">
          Como prefere seu pedido?
        </h3>
        <p className="text-brand-muted text-sm mt-1">
          Toque em uma opção para continuar
        </p>
      </div>

      {/* Botões */}
      <div className="flex gap-4 px-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSelectType("DINE_IN")}
          className="flex-1 bg-white rounded-3xl p-8 flex flex-col items-center gap-4 border-2 border-gray-100 hover:border-brand-primary shadow-sm hover:shadow-md transition-all duration-200 group"
        >
          <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 group-hover:bg-brand-primary/20 flex items-center justify-center transition-colors">
            <UtensilsCrossed className="text-brand-primary" size={38} />
          </div>
          <div className="text-center">
            <p className="text-brand-dark text-xl font-black">Comer Aqui</p>
            <p className="text-brand-muted text-xs mt-1">
              Retire no balcão e sente-se
            </p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSelectType("TAKEOUT")}
          className="flex-1 bg-white rounded-3xl p-8 flex flex-col items-center gap-4 border-2 border-gray-100 hover:border-brand-primary shadow-sm hover:shadow-md transition-all duration-200 group"
        >
          <div className="w-20 h-20 rounded-2xl bg-brand-secondary/10 group-hover:bg-brand-secondary/20 flex items-center justify-center transition-colors">
            <ShoppingBag className="text-brand-secondary" size={38} />
          </div>
          <div className="text-center">
            <p className="text-brand-dark text-xl font-black">Retirar</p>
            <p className="text-brand-muted text-xs mt-1">Levo para viagem</p>
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-auto py-6 text-center"
      >
        <p className="text-brand-muted/40 text-xs">
          Toque em qualquer opção para continuar
        </p>
      </motion.div>
    </div>
  );
}

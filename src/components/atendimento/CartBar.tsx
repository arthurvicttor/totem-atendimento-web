import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/utils/formatCurrency";

export function CartBar() {
  const navigate = useNavigate();
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const getTotal = useCartStore((s) => s.getTotal);

  const total = getTotal();
  const totalItems = getTotalItems();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-100 shadow-2xl"
        >
          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-brand-primary rounded-2xl p-4 flex items-center justify-between active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart size={22} className="text-white" />
                <span className="absolute -top-2 -right-2 bg-white text-brand-primary text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <span className="text-white font-bold text-base">Ver pedido</span>
            </div>
            <span className="text-white font-black text-lg">
              {formatCurrency(total)}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

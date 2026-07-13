import { AnimatePresence, motion } from "framer-motion";
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
        <motion.footer
          initial={{ y: 128 }}
          animate={{ y: 0 }}
          exit={{ y: 128 }}
          className="fixed bottom-0 left-0 w-full z-50 bg-inverse-surface h-32 border-t-4 border-on-surface flex justify-between items-center px-10 py-4"
        >
          <div className="flex flex-col">
            <span className="text-sm text-inverse-on-surface font-medium">
              Resumo do Pedido
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-secondary-container">
                shopping_cart
              </span>
              <span className="font-bold text-2xl text-white">
                {totalItems} {totalItems === 1 ? "Item" : "Itens"} •{" "}
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="bg-primary-container text-on-primary-container flex items-center gap-4 px-12 py-6 font-bold text-sm active:scale-95 transition-transform hover:brightness-110 uppercase cursor-pointer"
          >
            <span className="material-symbols-outlined">payments</span>
            Finalizar
          </button>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}

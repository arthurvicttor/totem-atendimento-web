import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      className="bg-brand-card rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-brand-primary/40 transition-all duration-200"
    >
      {/* Imagem */}
      <div className="relative h-44 bg-brand-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            🍔
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            ⭐ Destaque
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-bold text-base leading-tight">
          {product.name}
        </h3>
        <p className="text-white/50 text-xs mt-1 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Preço + Botão */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-brand-secondary font-black text-xl">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center hover:bg-brand-primary/80 active:scale-95 transition-all"
          >
            <Plus size={20} className="text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

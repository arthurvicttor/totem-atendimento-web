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
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => addItem(product)}
      className="bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-200 text-left w-full"
    >
      {/* Imagem centralizada */}
      <div className="relative h-40 bg-gray-50 flex items-center justify-center p-2">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-md"
          />
        ) : (
          <span className="text-6xl">🍔</span>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-brand-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
            ⭐ Destaque
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-brand-dark font-bold text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-1">
          <p className="text-brand-muted text-xs">a partir de</p>
          <p className="text-brand-dark font-black text-base">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

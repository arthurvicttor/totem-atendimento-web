import { motion } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface-container-lowest border-4 border-on-surface cursor-pointer group active:scale-[0.98] transition-transform overflow-hidden"
      onClick={() => addItem(product)}
    >
      {/* Imagem */}
      <div
        className="h-64 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url('${product.image}')` }}
      />

      {/* Conteúdo */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-on-surface leading-tight">
            {product.name}
          </h3>
          {product.featured && (
            <span className="bg-secondary text-on-secondary px-2 py-1 text-xs font-bold uppercase shrink-0 ml-2">
              Destaque
            </span>
          )}
        </div>

        <p className="text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-black text-2xl text-primary">
            {formatCurrency(product.price)}
          </span>
          <div className="bg-primary text-on-primary w-12 h-12 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

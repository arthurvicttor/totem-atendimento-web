import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryNav } from "@/components/atendimento/CategoryNav";
import { ProductCard } from "@/components/atendimento/ProductCard";
import { CartBar } from "@/components/atendimento/CartBar";
import { useOrderStore } from "@/stores/orderStore";
import { mockCategories, mockProducts } from "@/mocks/data";

export default function MenuPage() {
  const navigate = useNavigate();
  const orderType = useOrderStore((s) => s.orderType);
  const [activeCategoryId, setActiveCategoryId] = useState("1");

  const activeCategory = mockCategories.find((c) => c.id === activeCategoryId);

  const filteredProducts = useMemo(() => {
    const cat = mockCategories.find((c) => c.id === activeCategoryId);
    if (!cat) return mockProducts;
    if (cat.slug === "destaques") return mockProducts.filter((p) => p.featured);
    return mockProducts.filter((p) => p.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col pb-28">
      {/* ── Banner promocional ──────────────────────────── */}
      <div className="relative h-36 bg-gradient-to-r from-amber-900 to-amber-700 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <div>
            <p className="text-brand-secondary font-black text-xs uppercase tracking-widest">
              Novidade
            </p>
            <h2 className="text-white font-black text-2xl leading-tight">
              MEGA STACKER
              <br />
              <span className="text-brand-secondary">CHEDDAR</span>
            </h2>
          </div>
          <span className="text-7xl drop-shadow-xl">🍔</span>
        </div>
      </div>

      {/* ── Header com info ─────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-brand-muted text-sm font-medium"
        >
          <ChevronLeft size={18} />
          Voltar
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xl">🍔</span>
          <span className="text-brand-dark font-black text-lg">
            BURGER<span className="text-brand-primary">FAST</span>
          </span>
        </div>

        <div className="flex items-center gap-1 bg-brand-secondary/10 px-3 py-1 rounded-full">
          <Tag size={12} className="text-brand-secondary" />
          <span className="text-brand-secondary text-xs font-bold">
            {orderType === "DINE_IN" ? "Local" : "Retirada"}
          </span>
        </div>
      </div>

      {/* ── Layout principal: sidebar + grid ────────────── */}
      <div className="flex flex-1 gap-0">
        {/* Sidebar de categorias */}
        <div className="w-44 shrink-0 bg-white border-r border-gray-100 sticky top-0 h-screen overflow-y-auto">
          <CategoryNav
            categories={mockCategories}
            activeId={activeCategoryId}
            onSelect={setActiveCategoryId}
          />
        </div>

        {/* Grid de produtos */}
        <div className="flex-1 p-4">
          <motion.h2
            key={activeCategoryId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-brand-dark font-black text-2xl mb-4"
          >
            {activeCategory?.icon} {activeCategory?.name}
          </motion.h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl">😕</p>
              <p className="text-brand-muted mt-2 text-sm">
                Nenhum produto nessa categoria
              </p>
            </div>
          ) : (
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-3"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Barra do carrinho ──────────────────────────── */}
      <CartBar />
    </div>
  );
}

import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryNav } from "@/components/atendimento/CategoryNav";
import { ProductCard } from "@/components/atendimento/ProductCard";
import { CartBar } from "@/components/atendimento/CartBar";
import { useOrderStore } from "@/stores/orderStore";
import { useCartStore } from "@/stores/cartStore";
import { mockCategories, mockProducts } from "@/mocks/data";

export default function MenuPage() {
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState("hamburgueres");
  const [showToast, setShowToast] = useState(false);
  const orderType = useOrderStore((s) => s.orderType);
  const { clearCart } = useCartStore();

  const activeCategory = mockCategories.find((c) => c.id === activeCategoryId);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => p.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  const handleCancel = useCallback(() => {
    clearCart();
    navigate("/");
  }, [clearCart, navigate]);

  // Toast ao adicionar item — disparado pelo ProductCard via store
  // Vamos observar mudanças no carrinho para mostrar o toast
  const addItemWithToast = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  }, []);

  return (
    <div className="bg-surface text-on-surface h-screen flex flex-col overflow-hidden">
      {/* ── Top AppBar ──────────────────────────────────── */}
      <header className="bg-surface text-primary w-full border-b-4 border-on-surface flex justify-between items-center px-10 h-24 z-50 shrink-0">
        <div className="font-black text-2xl text-primary tracking-tight">
          BurgerFast
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface-container px-4 py-2 text-sm font-bold text-on-surface-variant uppercase">
            {orderType === "DINE_IN" ? "🍽️ Comer Aqui" : "🛍️ Retirada"}
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 cursor-pointer hover:bg-surface-container-high transition-transform active:scale-95 p-2"
          >
            <span className="material-symbols-outlined text-2xl">
              arrow_back
            </span>
            <span className="text-sm hidden md:block">Voltar</span>
          </button>
          <button className="flex items-center gap-1 cursor-pointer hover:bg-surface-container-high transition-transform active:scale-95 p-2">
            <span className="material-symbols-outlined text-2xl">help</span>
            <span className="text-sm hidden md:block">Ajuda</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar de categorias ──────────────────────── */}
        <CategoryNav
          categories={mockCategories}
          activeId={activeCategoryId}
          onSelect={setActiveCategoryId}
          onCancel={handleCancel}
        />

        {/* ── Área principal ─────────────────────────────── */}
        <main
          className="flex-grow p-10 overflow-y-auto bg-background pb-40"
          style={{ scrollbarWidth: "none" }}
        >
          <header className="mb-10">
            <motion.h1
              key={activeCategoryId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-black text-4xl text-on-surface"
            >
              {activeCategory?.name}
            </motion.h1>
          </header>

          {/* Grid de produtos */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl">😕</p>
              <p className="text-on-surface-variant mt-3 text-lg">
                Nenhum produto nessa categoria ainda
              </p>
            </div>
          ) : (
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <div key={product.id} onClick={addItemWithToast}>
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      {/* ── Barra inferior do carrinho ─────────────────── */}
      <CartBar />

      {/* ── Toast de feedback ──────────────────────────── */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-on-surface text-surface px-12 py-8 font-bold text-xl border-4 border-primary z-[100]"
          >
            ✅ Item adicionado ao pedido!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

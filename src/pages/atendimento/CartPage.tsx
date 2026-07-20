import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/utils/formatCurrency";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    increaseQty,
    decreaseQty,
    removeItem,
    getTotal,
    getTotalItems,
  } = useCartStore();
  const total = getTotal();
  const totalItems = getTotalItems();

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* ── AppBar ──────────────────────────────────────── */}
      <header className="shrink-0 bg-surface border-b-4 border-on-surface flex justify-between items-center px-10 h-24 z-50">
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 hover:bg-surface-container-high active:scale-95 transition-all p-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-bold text-sm uppercase">
            Voltar ao cardápio
          </span>
        </button>

        <span className="font-black text-2xl text-primary tracking-tight">
          Meu Pedido
        </span>

        <span className="bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant uppercase">
          {totalItems} {totalItems === 1 ? "item" : "itens"}
        </span>
      </header>

      {/* ── Conteúdo ────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lista de itens */}
        <div
          className="flex-1 overflow-y-auto p-10"
          style={{ scrollbarWidth: "none" }}
        >
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              <span
                className="material-symbols-outlined text-on-surface-variant"
                style={{ fontSize: "6rem" }}
              >
                shopping_cart
              </span>
              <p className="text-2xl font-bold text-on-surface-variant">
                Seu carrinho está vazio
              </p>
              <button
                onClick={() => navigate("/menu")}
                className="bg-primary text-on-primary px-10 py-4 font-bold uppercase active:scale-95 transition-transform"
              >
                Ver cardápio
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-surface border-4 border-on-surface flex gap-4 overflow-hidden"
                  >
                    {/* Imagem */}
                    <div
                      className="w-36 shrink-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${item.product.image}')`,
                      }}
                    />

                    {/* Info */}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-on-surface leading-tight">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-on-surface-variant mt-1 line-clamp-1">
                          {item.product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Controle de quantidade */}
                        <div className="flex items-center border-4 border-on-surface">
                          <button
                            onClick={() => decreaseQty(item.product.id)}
                            className="w-12 h-12 flex items-center justify-center bg-surface hover:bg-surface-container active:bg-surface-container-high transition-colors"
                          >
                            <span className="material-symbols-outlined text-xl">
                              {item.quantity === 1 ? "delete" : "remove"}
                            </span>
                          </button>

                          <span className="w-12 h-12 flex items-center justify-center font-black text-lg border-x-4 border-on-surface">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(item.product.id)}
                            className="w-12 h-12 flex items-center justify-center bg-surface hover:bg-surface-container active:bg-surface-container-high transition-colors"
                          >
                            <span className="material-symbols-outlined text-xl">
                              add
                            </span>
                          </button>
                        </div>

                        {/* Preço unitário x quantidade */}
                        <div className="text-right">
                          <p className="text-xs text-on-surface-variant">
                            {item.quantity}x {formatCurrency(item.unitPrice)}
                          </p>
                          <p className="font-black text-2xl text-primary">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Botão remover */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="w-14 shrink-0 bg-surface-container hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors border-l-4 border-on-surface"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ── Resumo lateral ──────────────────────────────── */}
        {items.length > 0 && (
          <aside className="w-96 shrink-0 bg-surface border-l-4 border-on-surface flex flex-col p-8 gap-6">
            <h2 className="font-black text-2xl text-on-surface">Resumo</h2>

            {/* Lista resumida */}
            <div
              className="flex-1 overflow-y-auto flex flex-col gap-3"
              style={{ scrollbarWidth: "none" }}
            >
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center gap-2"
                >
                  <span className="text-sm text-on-surface-variant line-clamp-1 flex-1">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="text-sm font-bold text-on-surface shrink-0">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Divisor */}
            <div className="border-t-4 border-on-surface pt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-medium">
                  Subtotal
                </span>
                <span className="font-bold">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-medium">
                  Taxa de serviço
                </span>
                <span className="font-bold text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between items-center border-t-4 border-on-surface pt-3">
                <span className="font-black text-xl text-on-surface">
                  Total
                </span>
                <span className="font-black text-3xl text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/payment")}
                className="w-full bg-primary text-on-primary py-5 font-black text-lg uppercase flex items-center justify-center gap-3 active:scale-95 transition-transform hover:brightness-110"
              >
                <span className="material-symbols-outlined">payments</span>
                Ir para pagamento
              </button>
              <button
                onClick={() => navigate("/menu")}
                className="w-full border-4 border-on-surface text-on-surface py-4 font-bold text-sm uppercase active:scale-95 transition-transform hover:bg-surface-container"
              >
                + Adicionar mais itens
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

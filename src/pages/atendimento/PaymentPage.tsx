import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { formatCurrency } from "@/utils/formatCurrency";
import type { PaymentMethod } from "@/types";

// ── Simulação de QR Code PIX ──────────────────────────
const FAKE_PIX_CODE =
  "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b028-f142ec7e2130520400005303986540529.905802BR5913BurgerFast6009SAO PAULO62070503***6304B14A";

type PaymentStep = "select" | "processing" | "approved";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [step, setStep] = useState<PaymentStep>("select");
  const [copiedPix, setCopiedPix] = useState(false);

  const { getTotal, getTotalItems } = useCartStore();
  const { orderType } = useOrderStore();

  const total = getTotal();
  const totalItems = getTotalItems();

  function handleConfirmPayment() {
    if (!selectedMethod) return;
    setStep("processing");

    // Simula processamento
    setTimeout(() => {
      setStep("approved");

      // Redireciona para confirmação
      setTimeout(() => {
        navigate("/confirmation");
      }, 2000);
    }, 2500);
  }

  function handleCopyPix() {
    navigator.clipboard.writeText(FAKE_PIX_CODE);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  }

  const paymentMethods = [
    {
      id: "CARD" as PaymentMethod,
      label: "Cartão",
      sublabel: "Crédito ou Débito",
      icon: "credit_card",
    },
    {
      id: "PIX" as PaymentMethod,
      label: "PIX",
      sublabel: "Aprovação na hora",
      icon: "qr_code",
    },
    {
      id: "CASH" as PaymentMethod,
      label: "Dinheiro",
      sublabel: "Pague no caixa",
      icon: "payments",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* ── AppBar ──────────────────────────────────────── */}
      <header className="shrink-0 bg-surface border-b-4 border-on-surface flex justify-between items-center px-10 h-24 z-50">
        <button
          onClick={() => navigate("/cart")}
          disabled={step !== "select"}
          className="flex items-center gap-2 hover:bg-surface-container-high active:scale-95 transition-all p-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-bold text-sm uppercase">Voltar</span>
        </button>

        <span className="font-black text-2xl text-primary tracking-tight">
          Pagamento
        </span>

        <span className="bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant uppercase">
          {orderType === "DINE_IN" ? "🍽️ Local" : "🛍️ Retirada"}
        </span>
      </header>

      {/* ── Conteúdo ────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lado esquerdo — seleção de método */}
        <div
          className="flex-1 p-10 overflow-y-auto flex flex-col gap-8"
          style={{ scrollbarWidth: "none" }}
        >
          <div>
            <h2 className="font-black text-3xl text-on-surface">
              Como vai pagar?
            </h2>
            <p className="text-on-surface-variant mt-1">
              Escolha a forma de pagamento
            </p>
          </div>

          {/* Métodos de pagamento */}
          <div className="flex flex-col gap-4">
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(method.id)}
                disabled={step !== "select"}
                className={`
                  w-full flex items-center gap-6 p-6 border-4 transition-all duration-150
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    selectedMethod === method.id
                      ? "border-primary bg-primary text-on-primary"
                      : "border-on-surface bg-surface text-on-surface hover:bg-surface-container"
                  }
                `}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "2.5rem" }}
                >
                  {method.icon}
                </span>
                <div className="text-left">
                  <p className="font-black text-xl">{method.label}</p>
                  <p
                    className={`text-sm ${selectedMethod === method.id ? "text-on-primary/70" : "text-on-surface-variant"}`}
                  >
                    {method.sublabel}
                  </p>
                </div>
                {selectedMethod === method.id && (
                  <span className="material-symbols-outlined ml-auto text-3xl">
                    check_circle
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Instruções do método selecionado */}
          <AnimatePresence mode="wait">
            {selectedMethod === "PIX" && step === "select" && (
              <motion.div
                key="pix"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-surface border-4 border-on-surface p-6 flex flex-col items-center gap-4"
              >
                {/* QR Code fake com CSS */}
                <div className="w-48 h-48 bg-on-surface flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-1 p-4">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-5 ${Math.random() > 0.5 ? "bg-surface" : "bg-on-surface"}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant text-center">
                  Escaneie o QR Code com o app do seu banco
                </p>

                <button
                  onClick={handleCopyPix}
                  className="flex items-center gap-2 border-4 border-on-surface px-6 py-3 font-bold text-sm uppercase active:scale-95 transition-transform hover:bg-surface-container w-full justify-center"
                >
                  <span className="material-symbols-outlined text-xl">
                    {copiedPix ? "check" : "content_copy"}
                  </span>
                  {copiedPix ? "Código copiado!" : "Copiar código PIX"}
                </button>
              </motion.div>
            )}

            {selectedMethod === "CARD" && step === "select" && (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-surface border-4 border-on-surface p-6 flex flex-col items-center gap-4"
              >
                <span
                  className="material-symbols-outlined text-on-surface-variant"
                  style={{ fontSize: "5rem" }}
                >
                  point_of_sale
                </span>
                <p className="font-bold text-lg text-on-surface text-center">
                  Aproxime ou insira seu cartão na maquininha
                </p>
                <p className="text-sm text-on-surface-variant text-center">
                  A maquininha será ativada após confirmar o pedido
                </p>
              </motion.div>
            )}

            {selectedMethod === "CASH" && step === "select" && (
              <motion.div
                key="cash"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-surface border-4 border-on-surface p-6 flex flex-col items-center gap-4"
              >
                <span
                  className="material-symbols-outlined text-on-surface-variant"
                  style={{ fontSize: "5rem" }}
                >
                  storefront
                </span>
                <p className="font-bold text-lg text-on-surface text-center">
                  Dirija-se ao caixa para realizar o pagamento
                </p>
                <p className="text-sm text-on-surface-variant text-center">
                  Apresente o número do seu pedido ao atendente
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lado direito — resumo + ação */}
        <aside className="w-96 shrink-0 bg-surface border-l-4 border-on-surface flex flex-col p-8 gap-6">
          <h2 className="font-black text-2xl text-on-surface">Resumo</h2>

          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Itens</span>
                <span className="font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-bold">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Taxa de serviço</span>
                <span className="font-bold text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between items-center border-t-4 border-on-surface pt-4">
                <span className="font-black text-xl">Total</span>
                <span className="font-black text-3xl text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Botão confirmar */}
            <button
              onClick={handleConfirmPayment}
              disabled={!selectedMethod || step !== "select"}
              className="w-full bg-primary text-on-primary py-5 font-black text-lg uppercase flex items-center justify-center gap-3 active:scale-95 transition-transform hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 mt-6"
            >
              <span className="material-symbols-outlined">check_circle</span>
              Confirmar pedido
            </button>
          </div>
        </aside>
      </div>

      {/* ── Overlay de processamento ────────────────────── */}
      <AnimatePresence>
        {step === "processing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-on-surface/80 z-[100] flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <span
                className="material-symbols-outlined text-primary-container"
                style={{ fontSize: "5rem" }}
              >
                progress_activity
              </span>
            </motion.div>
            <p className="text-white font-black text-2xl">
              Processando pagamento...
            </p>
          </motion.div>
        )}

        {step === "approved" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-on-surface/90 z-[100] flex flex-col items-center justify-center gap-6"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="material-symbols-outlined text-primary-container"
              style={{ fontSize: "8rem", fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </motion.span>
            <p className="text-white font-black text-3xl">
              Pagamento aprovado!
            </p>
            <p className="text-white/60 text-sm">Redirecionando...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

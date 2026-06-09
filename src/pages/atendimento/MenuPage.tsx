import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/stores/orderStore";

export default function MenuPage() {
  const navigate = useNavigate();
  const orderType = useOrderStore((s) => s.orderType);

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4">
      <h1 className="text-white text-3xl font-black">Cardápio</h1>
      <p className="text-white/50">
        Pedido: {orderType === "DINE_IN" ? "🍽️ Comer aqui" : "🛍️ Retirar"}
      </p>
      <button
        onClick={() => navigate("/")}
        className="text-brand-primary underline text-sm"
      >
        ← Voltar
      </button>
    </div>
  );
}

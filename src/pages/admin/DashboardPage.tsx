import { motion } from "framer-motion";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAuthStore } from "@/stores/authStore";

// Dados mock do dashboard
const stats = [
  {
    label: "Pedidos hoje",
    value: "47",
    icon: "receipt_long",
    color: "bg-primary text-on-primary",
  },
  {
    label: "Faturamento",
    value: "R$ 1.840",
    icon: "payments",
    color: "bg-primary-container text-on-primary-container",
  },
  {
    label: "Ticket médio",
    value: "R$ 39,14",
    icon: "trending_up",
    color: "bg-surface-container text-on-surface",
  },
  {
    label: "Produtos ativos",
    value: "24",
    icon: "lunch_dining",
    color: "bg-surface-container text-on-surface",
  },
];

const recentOrders = [
  {
    id: "#0042",
    items: "X-Burguer + Fritas",
    total: "R$ 39,90",
    status: "READY",
    type: "DINE_IN",
  },
  {
    id: "#0041",
    items: "Combo Bacon Bliss",
    total: "R$ 52,80",
    status: "PREPARING",
    type: "TAKEOUT",
  },
  {
    id: "#0040",
    items: "Avocado Snap",
    total: "R$ 12,75",
    status: "PREPARING",
    type: "DINE_IN",
  },
  {
    id: "#0039",
    items: "Blue Velvet + Bebida",
    total: "R$ 24,85",
    status: "CONFIRMED",
    type: "TAKEOUT",
  },
  {
    id: "#0038",
    items: "Earth Shaker",
    total: "R$ 15,25",
    status: "DELIVERED",
    type: "DINE_IN",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: {
    label: "Aguardando",
    color: "bg-surface-container text-on-surface-variant",
  },
  CONFIRMED: {
    label: "Confirmado",
    color: "bg-primary-container text-on-primary-container",
  },
  PREPARING: {
    label: "Preparando",
    color: "bg-secondary-container text-on-secondary-container",
  },
  READY: { label: "Pronto", color: "bg-green-100 text-green-800" },
  DELIVERED: {
    label: "Entregue",
    color: "bg-surface-container text-on-surface-variant",
  },
  CANCELLED: {
    label: "Cancelado",
    color: "bg-secondary-container text-on-secondary-container",
  },
};

const topProducts = [
  { name: "X-Burguer Clássico", qty: 18, revenue: "R$ 448,20" },
  { name: "Bacon Bliss", qty: 12, revenue: "R$ 192,00" },
  { name: "Combo X-Burguer", qty: 10, revenue: "R$ 399,00" },
  { name: "Avocado Snap", qty: 8, revenue: "R$ 102,00" },
  { name: "Blue Velvet", qty: 6, revenue: "R$ 95,70" },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <AdminLayout>
      <div className="p-8 flex flex-col gap-8">
        {/* ── Cabeçalho ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-on-surface-variant text-sm font-medium uppercase tracking-widest">
            Bem-vindo de volta
          </p>
          <h1 className="font-black text-4xl text-on-surface mt-1">
            Olá, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </motion.div>

        {/* ── Cards de estatísticas ────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${stat.color} border-4 border-on-surface p-6 flex flex-col gap-3`}
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {stat.icon}
              </span>
              <div>
                <p className="font-black text-3xl leading-none">{stat.value}</p>
                <p className="text-sm font-medium mt-1 opacity-70">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Grid principal ───────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Pedidos recentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-2 bg-surface border-4 border-on-surface"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b-4 border-on-surface">
              <h2 className="font-black text-xl text-on-surface">
                Pedidos Recentes
              </h2>
              <button
                className="text-sm font-bold text-primary hover:underline uppercase"
                onClick={() => {}}
              >
                Ver todos
              </button>
            </div>

            <div className="divide-y-4 divide-on-surface/10">
              {recentOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <span className="font-black text-lg text-on-surface w-16 shrink-0">
                    {order.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-on-surface truncate">
                      {order.items}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {order.type === "DINE_IN" ? "🍽️ Local" : "🛍️ Retirada"}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 uppercase shrink-0 ${statusConfig[order.status].color}`}
                  >
                    {statusConfig[order.status].label}
                  </span>
                  <span className="font-black text-sm text-primary shrink-0">
                    {order.total}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top produtos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-surface border-4 border-on-surface"
          >
            <div className="px-6 py-5 border-b-4 border-on-surface">
              <h2 className="font-black text-xl text-on-surface">
                Mais Vendidos
              </h2>
              <p className="text-on-surface-variant text-xs mt-1">Hoje</p>
            </div>

            <div className="divide-y-4 divide-on-surface/10">
              {topProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 px-6 py-4"
                >
                  <span className="font-black text-2xl text-on-surface/20 w-6 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-on-surface truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {product.qty} vendidos
                    </p>
                  </div>
                  <span className="font-black text-sm text-primary shrink-0">
                    {product.revenue}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}

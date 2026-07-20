import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Atendimento
import WelcomePage from "@/pages/atendimento/WelcomePage";
import MenuPage from "@/pages/atendimento/MenuPage";
import CartPage from "@/pages/atendimento/CartPage";
// import PaymentPage from "@/pages/atendimento/PaymentPage";
// import ConfirmationPage from "@/pages/atendimento/ConfirmationPage";

// Admin
import LoginPage from "@/pages/admin/LoginPage";
// import DashboardPage from "@/pages/admin/DashboardPage";

const router = createBrowserRouter([
  //  Atendimento
  { path: "/", element: <WelcomePage /> },
  { path: "/menu", element: <MenuPage /> },
  { path: "/cart", element: <CartPage /> },
  // { path: "/payment", element: <PaymentPage /> },
  // { path: "/confirmation", element: <ConfirmationPage /> },

  // ── Admin ─────────────────────────────
  { path: "/admin", element: <LoginPage /> },
  // { path: "/admin/dashboard", element: <DashboardPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

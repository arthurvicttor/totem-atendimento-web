import { create } from "zustand";
import type { OrderType } from "@/types";

interface OrderState {
  orderType: OrderType | null;
  setOrderType: (type: OrderType) => void;
  reset: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orderType: null,

  setOrderType: (type) => set({ orderType: type }),

  reset: () => set({ orderType: null }),
}));

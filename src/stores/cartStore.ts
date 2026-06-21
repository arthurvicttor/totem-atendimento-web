import { create } from "zustand";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = get().items;
    const existing = items.find((i) => i.product.id === product.id);

    if (existing) {
      set({
        items: items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      });
    } else {
      set({
        items: [
          ...items,
          {
            product,
            quantity: 1,
            removedIngredients: [],
            addedIngredients: [],
            unitPrice: product.price,
          },
        ],
      });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((i) => i.product.id !== productId) });
  },

  increaseQty: (productId) => {
    set({
      items: get().items.map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    });
  },

  decreaseQty: (productId) => {
    const items = get().items;
    const item = items.find((i) => i.product.id === productId);

    if (!item) return;

    if (item.quantity === 1) {
      set({ items: items.filter((i) => i.product.id !== productId) });
    } else {
      set({
        items: items.map((i) =>
          i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      });
    }
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0,
    );
  },

  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },
}));

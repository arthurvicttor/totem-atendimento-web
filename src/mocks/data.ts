import type { Category, Product } from "@/types";

export const mockCategories: Category[] = [
  { id: "1", name: "Destaques", slug: "destaques", icon: "⭐" },
  { id: "2", name: "Burgers", slug: "burgers", icon: "🍔" },
  { id: "3", name: "Frangos", slug: "frangos", icon: "🍗" },
  { id: "4", name: "Combos", slug: "combos", icon: "🎁" },
  { id: "5", name: "Bebidas", slug: "bebidas", icon: "🥤" },
  { id: "6", name: "Sobremesas", slug: "sobremesas", icon: "🍦" },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "X-Burguer Clássico",
    description:
      "Pão brioche, blend 180g, queijo, alface, tomate e maionese da casa",
    price: 24.9,
    categoryId: "2",
    ingredients: [],
    available: true,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "X-Bacon Duplo",
    description:
      "Dois blends 150g, bacon crocante, queijo cheddar e molho especial",
    price: 34.9,
    categoryId: "2",
    ingredients: [],
    available: true,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Chicken Crispy",
    description:
      "Frango empanado crocante, maionese de ervas e alface americana",
    price: 22.9,
    categoryId: "3",
    ingredients: [],
    available: true,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Combo X-Burguer",
    description: "X-Burguer + Fritas médias + Refrigerante 400ml",
    price: 39.9,
    categoryId: "4",
    ingredients: [],
    available: true,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Refrigerante 400ml",
    description: "Coca-Cola, Guaraná ou Sprite gelado",
    price: 8.9,
    categoryId: "5",
    ingredients: [],
    available: true,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Milk Shake",
    description: "Chocolate, morango ou baunilha — 400ml",
    price: 16.9,
    categoryId: "6",
    ingredients: [],
    available: true,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    name: "Batata Frita G",
    description: "Batatas crocantes temperadas com sal e ervas",
    price: 12.9,
    categoryId: "1",
    ingredients: [],
    available: true,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1630384060421-cb20aab7d408?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Sundae Chocolate",
    description: "Sorvete cremoso com calda quente de chocolate",
    price: 10.9,
    categoryId: "6",
    ingredients: [],
    available: true,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
  },
];

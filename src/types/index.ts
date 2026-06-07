// Entidades do banco

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  price: number; // preço adicional (0 se incluso)
  isDefault: boolean; // vem por padrão no produto?
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: string;
  category?: Category;
  ingredients: Ingredient[];
  available: boolean;
  featured: boolean;
}

// Carrinho

export interface CartItem {
  product: Product;
  quantity: number;
  removedIngredients: string[]; // ids dos ingredientes removidos
  addedIngredients: string[]; // ids dos ingredientes adicionados
  unitPrice: number; // preço final unitário (com extras)
  notes?: string;
}

// Pedido

export type OrderType = "DINE_IN" | "TAKEOUT";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "CARD" | "PIX" | "CASH";

export interface Order {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  removedIngredients: string[];
  addedIngredients: string[];
  notes?: string;
}

// Auth (Admin)

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "OPERATOR";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// API Responses

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

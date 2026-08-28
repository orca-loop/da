import { createContext } from 'react';
import type { CartItem, MenuItem } from '@/types/menu';

export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  totalItems: number;
  totalAmount: number;
}

export const CartContext = createContext<CartContextType | null>(null);

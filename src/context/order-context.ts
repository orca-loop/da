import { createContext } from 'react';
import type { Order, CustomerDetails } from '@/types/menu';

export interface OrderContextType {
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  customerDetails: CustomerDetails | null;
  setCustomerDetails: (details: CustomerDetails | null) => void;
}

export const OrderContext = createContext<OrderContextType | null>(null);

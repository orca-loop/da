import { useState, type ReactNode } from 'react';
import type { Order, CustomerDetails } from '@/types/menu';
import { OrderContext } from '@/context/order-context';

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null);

  return (
    <OrderContext.Provider
      value={{
        lastOrder,
        setLastOrder,
        customerDetails,
        setCustomerDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

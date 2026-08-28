import { useContext } from 'react';
import { OrderContext, type OrderContextType } from '@/context/order-context';

export function useOrder(): OrderContextType {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}

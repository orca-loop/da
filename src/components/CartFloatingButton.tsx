import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/utils/helpers';

export function CartFloatingButton() {
  const { totalItems, totalAmount } = useCart();

  if (totalItems === 0) return null;

  return (
    <Link data-ev-id="ev_52b4b5e79a"
    to="/cart"
    className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto bg-charcoal text-white rounded-xl shadow-xl p-4 flex items-center justify-between z-40 hover:bg-charcoal-light transition-colors active:scale-[0.98]">

      <div data-ev-id="ev_bc5069139f" className="flex items-center gap-3">
        <div data-ev-id="ev_cbf0a0893a" className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span data-ev-id="ev_28b892b4c9" className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-charcoal text-xs font-bold rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </div>
        <span data-ev-id="ev_6b74fe577a" className="font-medium">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
      </div>
      <div data-ev-id="ev_64163f121e" className="flex items-center gap-2">
        <span data-ev-id="ev_0185a59bd8" className="font-bold text-lg">{formatPrice(totalAmount)}</span>
        <span data-ev-id="ev_98dda547bf" className="text-gold">→</span>
      </div>
    </Link>);

}
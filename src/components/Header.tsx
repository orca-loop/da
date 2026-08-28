import { Link, useLocation } from 'react-router';
import { ShoppingCart, ArrowLeft, Home } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export function Header() {
  const location = useLocation();
  const { totalItems } = useCart();
  const isHome = location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <header data-ev-id="ev_80cd158f73" className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div data-ev-id="ev_04ebcbba22" className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <div data-ev-id="ev_b2c43884fa" className="flex items-center gap-3">
          {!isHome &&
          <Link data-ev-id="ev_3bd255fbfd"
          to="/"
          className="p-2 -ml-2 text-charcoal hover:text-gold transition-colors"
          aria-label="Go back">

              <ArrowLeft className="w-5 h-5" />
            </Link>
          }
          <Link data-ev-id="ev_9c9190e33a" to="/" className="flex items-center gap-2">
            <div data-ev-id="ev_dd387fbd42" className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span data-ev-id="ev_a0748a1de7" className="text-xs font-display font-bold text-charcoal">A</span>
            </div>
            <span data-ev-id="ev_70bdfc7fd1" className="font-display font-semibold text-charcoal">Hotel Amrit</span>
          </Link>
        </div>

        <div data-ev-id="ev_04957ebdae" className="flex items-center gap-2">
          {!isHome &&
          <Link data-ev-id="ev_28ed7da794"
          to="/"
          className="p-2 text-charcoal hover:text-gold transition-colors"
          aria-label="Home">

              <Home className="w-5 h-5" />
            </Link>
          }
          <Link data-ev-id="ev_738ea121cf"
          to="/cart"
          className="relative p-2 text-charcoal hover:text-gold transition-colors"
          aria-label="Cart">

            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 &&
            <span data-ev-id="ev_14cfd7f020" className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-charcoal text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            }
          </Link>
        </div>
      </div>
    </header>);

}
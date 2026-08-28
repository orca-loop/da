import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/utils/helpers';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div data-ev-id="ev_d7fdeb91c6" className="min-h-screen bg-surface">
        <Header />
        <main data-ev-id="ev_55dd4e94e5" className="max-w-lg mx-auto px-4 py-16 flex flex-col items-center text-center">
          <div data-ev-id="ev_38ddf4d5f9" className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 data-ev-id="ev_df9618829c" className="text-xl font-semibold text-charcoal mb-2">Your cart is empty</h2>
          <p data-ev-id="ev_302660936a" className="text-muted-foreground mb-6">
            Add some delicious items from our menu!
          </p>
          <Link data-ev-id="ev_d2ce323c31" to="/menu">
            <Button variant="primary" size="lg">
              Browse Menu
            </Button>
          </Link>
        </main>
      </div>);

  }

  return (
    <div data-ev-id="ev_ffb66ee0ad" className="min-h-screen bg-surface pb-32">
      <Header />

      <main data-ev-id="ev_cf028f4a7f" className="max-w-lg mx-auto px-4 py-4">
        <h1 data-ev-id="ev_4d5203780b" className="text-xl font-display font-semibold text-charcoal mb-4">
          Your Order
        </h1>

        {/* Cart Items */}
        <div data-ev-id="ev_a99f84f878" className="flex flex-col gap-3">
          {items.map((item) =>
          <div data-ev-id="ev_c955005c16"
          key={item.id}
          className="bg-white rounded-xl border border-border p-4">

              <div data-ev-id="ev_e7f9fb68da" className="flex gap-3">
                {/* Image */}
                <div data-ev-id="ev_c33d4026a8" className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {item.image_url ?
                <img data-ev-id="ev_8640d1d779"
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover" /> :


                <div data-ev-id="ev_4c70bf2853" className="w-full h-full flex items-center justify-center text-xl">
                      🍝
                    </div>
                }
                </div>

                {/* Details */}
                <div data-ev-id="ev_03dd7b20ca" className="flex-1 min-w-0">
                  <div data-ev-id="ev_6970d08f3f" className="flex items-start justify-between">
                    <h3 data-ev-id="ev_a075395553" className="font-semibold text-charcoal truncate pr-2">
                      {item.name}
                    </h3>
                    <button data-ev-id="ev_2b5a43d6c9"
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove item">

                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p data-ev-id="ev_2508c7048c" className="text-sm text-muted-foreground">
                    {formatPrice(item.price)} each
                  </p>

                  <div data-ev-id="ev_7ccd50ba5c" className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div data-ev-id="ev_13db190baf" className="flex items-center gap-2 bg-muted rounded-lg">
                      <button data-ev-id="ev_38a8ba33c0"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-border rounded-l-lg transition-colors"
                    aria-label="Decrease quantity">

                        <Minus className="w-4 h-4" />
                      </button>
                      <span data-ev-id="ev_5fb955347d" className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button data-ev-id="ev_69415fb39f"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-border rounded-r-lg transition-colors"
                    aria-label="Increase quantity">

                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span data-ev-id="ev_2ac191c165" className="font-bold text-charcoal">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div data-ev-id="ev_d359215cc0" className="mt-6 bg-white rounded-xl border border-border p-4">
          <h3 data-ev-id="ev_db0a1cfd64" className="font-semibold text-charcoal mb-3">Order Summary</h3>
          
          <div data-ev-id="ev_5a161ae084" className="flex flex-col gap-2 text-sm">
            {items.map((item) =>
            <div data-ev-id="ev_d8517aeb6f" key={item.id} className="flex justify-between">
                <span data-ev-id="ev_cc38597816" className="text-muted-foreground">
                  {item.quantity} × {item.name}
                </span>
                <span data-ev-id="ev_55d087b933">{formatPrice(item.price * item.quantity)}</span>
              </div>
            )}
          </div>

          <div data-ev-id="ev_790d1de761" className="border-t border-border mt-3 pt-3 flex justify-between items-center">
            <span data-ev-id="ev_98e50b9dd4" className="font-semibold text-charcoal">Total</span>
            <span data-ev-id="ev_7f36f01195" className="text-xl font-bold text-gold">{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <div data-ev-id="ev_1a5ca37c7c" className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4">
        <div data-ev-id="ev_c8e32deec9" className="max-w-lg mx-auto flex flex-col gap-2">
          <Link data-ev-id="ev_601ccdbdd4" to="/checkout" className="w-full">
            <Button variant="primary" size="lg" fullWidth>
              ORDER NOW • {formatPrice(totalAmount)}
            </Button>
          </Link>
          <Link data-ev-id="ev_8675c2cf63" to="/menu" className="w-full">
            <Button variant="ghost" size="md" fullWidth>
              Continue Ordering
            </Button>
          </Link>
        </div>
      </div>
    </div>);

}
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/utils/helpers';
import type { MenuItem } from '@/types/menu';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  const handleAdd = () => {
    addItem(item);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div data-ev-id="ev_48920dc87e" className="bg-white rounded-xl shadow-sm border border-border overflow-hidden flex gap-3 p-3">
      {/* Image */}
      <div data-ev-id="ev_97d88b875a" className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        {item.image_url ?
        <img data-ev-id="ev_e57fd97f6e"
        src={item.image_url}
        alt={item.name}
        className="w-full h-full object-cover"
        loading="lazy" /> :


        <div data-ev-id="ev_1b0a7baca8" className="w-full h-full flex items-center justify-center text-2xl">
            🍝
          </div>
        }
      </div>

      {/* Content */}
      <div data-ev-id="ev_a733b95b49" className="flex-1 flex flex-col justify-between min-w-0">
        <div data-ev-id="ev_a0d73f3b20">
          <div data-ev-id="ev_6fb36bae8b" className="flex items-start justify-between gap-2">
            <h3 data-ev-id="ev_fa5d51ecd3" className="font-semibold text-charcoal leading-tight">{item.name}</h3>
            {item.is_veg &&
            <span data-ev-id="ev_85d178a0c6" className="flex-shrink-0 w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
                <span data-ev-id="ev_22b77c58d5" className="w-2 h-2 bg-green-600 rounded-full" />
              </span>
            }
          </div>
          <p data-ev-id="ev_e90c27ae9e" className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
            {item.description}
          </p>
        </div>

        <div data-ev-id="ev_fac7978f8a" className="flex items-center justify-between mt-2">
          <span data-ev-id="ev_b79e0e7c14" className="font-bold text-charcoal">{formatPrice(item.price)}</span>

          {quantity === 0 ?
          <button data-ev-id="ev_e90a6bc421"
          onClick={handleAdd}
          className="flex items-center gap-1 px-4 py-1.5 bg-gold text-charcoal font-semibold rounded-lg text-sm hover:bg-gold-dark transition-colors active:scale-95">

              <Plus className="w-4 h-4" />
              ADD
            </button> :

          <div data-ev-id="ev_98875ae488" className="flex items-center gap-2 bg-gold/10 rounded-lg">
              <button data-ev-id="ev_1df76a4f93"
            onClick={handleDecrement}
            className="p-1.5 text-gold hover:bg-gold/20 rounded-l-lg transition-colors"
            aria-label="Decrease quantity">

                <Minus className="w-4 h-4" />
              </button>
              <span data-ev-id="ev_bc923bde35" className="w-6 text-center font-bold text-charcoal">{quantity}</span>
              <button data-ev-id="ev_a5c37362be"
            onClick={handleIncrement}
            className="p-1.5 text-gold hover:bg-gold/20 rounded-r-lg transition-colors"
            aria-label="Increase quantity">

                <Plus className="w-4 h-4" />
              </button>
            </div>
          }
        </div>
      </div>
    </div>);

}
import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { MenuCard } from '@/components/MenuCard';
import { CartFloatingButton } from '@/components/CartFloatingButton';
import { sampleMenuItems } from '@/data/sampleMenu';
import { MENU_CATEGORIES, type MenuCategory } from '@/types/menu';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Starters');

  const filteredItems = useMemo(() => {
    return sampleMenuItems.filter(
      (item) => item.category === activeCategory && item.is_available
    );
  }, [activeCategory]);

  return (
    <div data-ev-id="ev_6ca0bde1e3" className="min-h-screen bg-surface pb-24">
      <Header />

      {/* Category Tabs */}
      <div data-ev-id="ev_7d0f3d62dc" className="sticky top-14 z-40 bg-white border-b border-border">
        <div data-ev-id="ev_62bb533141" className="max-w-lg mx-auto">
          <div data-ev-id="ev_dff8a85826" className="flex overflow-x-auto scrollbar-hide py-3 px-4 gap-2">
            {MENU_CATEGORIES.map((category) =>
            <button data-ev-id="ev_f77606f7b7"
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category ?
            'bg-gold text-charcoal' :
            'bg-muted text-muted-foreground hover:bg-border'}`
            }>

                {category}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main data-ev-id="ev_9055be45e1" className="max-w-lg mx-auto px-4 py-4">
        <h2 data-ev-id="ev_8507f0a593" className="text-xl font-display font-semibold text-charcoal mb-4">
          {activeCategory}
        </h2>

        <div data-ev-id="ev_3598d6809e" className="flex flex-col gap-3">
          {filteredItems.length > 0 ?
          filteredItems.map((item) => <MenuCard key={item.id} item={item} />) :

          <div data-ev-id="ev_e741713671" className="text-center py-12 text-muted-foreground">
              <p data-ev-id="ev_ba80a83a0d">No items available in this category.</p>
            </div>
          }
        </div>
      </main>

      {/* Floating Cart Button */}
      <CartFloatingButton />

      {/* Hide scrollbar */}
      <style data-ev-id="ev_51270241c3">{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>);

}
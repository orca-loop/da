import { Link } from 'react-router';
import { CheckCircle, Phone } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { useOrder } from '@/hooks/use-order';
import { formatPrice } from '@/utils/helpers';

export default function Confirmation() {
  const { lastOrder, customerDetails } = useOrder();

  const handleCall = () => {
    window.location.href = 'tel:+919111799982';
  };

  if (!lastOrder) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <main className="max-w-lg mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-semibold text-charcoal mb-2">No recent order found</h2>
          <Link to="/menu">
            <Button variant="primary">Browse Menu</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-lg mx-auto px-4 py-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-2xl font-display font-semibold text-charcoal">Order Placed!</h1>
        <p className="text-muted-foreground mt-2">
          Thanks {customerDetails?.fullName || ''}, your order has been sent to our kitchen.
        </p>

        <div className="w-full bg-white rounded-xl border border-border p-4 mt-6 text-left">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-semibold text-charcoal">{lastOrder.order_id}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Table</span>
            <span className="font-semibold text-charcoal">{lastOrder.table_number}</span>
          </div>

          <div className="border-t border-border pt-3 flex flex-col gap-2 text-sm">
            {lastOrder.ordered_items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.quantity} × {item.name}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-3 pt-3 flex justify-between items-center">
            <span className="font-semibold text-charcoal">Total</span>
            <span className="text-xl font-bold text-gold">{formatPrice(lastOrder.total_amount)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          If it's urgent or you don't hear back in a few minutes, feel free to call us directly.
        </p>

        <Link to="/review" className="w-full mt-6">
          <Button variant="secondary" size="lg" fullWidth>
            Rate Your Experience
          </Button>
        </Link>

        <div className="w-full flex flex-col gap-3 mt-4">
          <Button variant="outline" size="lg" fullWidth onClick={handleCall}>
            <Phone className="w-4 h-4" />
            Call the Hotel
          </Button>
          <Link to="/" className="w-full">
            <Button variant="primary" size="lg" fullWidth>
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

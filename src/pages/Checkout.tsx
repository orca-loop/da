import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useCart } from '@/hooks/use-cart';
import { useOrder } from '@/hooks/use-order';
import { sendTelegramMessage, formatFoodOrderMessage } from '@/lib/telegram';
import { logOrderToSheet } from '@/lib/sheets';
import { formatPrice, generateOrderId, validateMobileNumber } from '@/utils/helpers';
import type { CustomerDetails, Order, OrderItem } from '@/types/menu';

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, totalAmount, clearCart } = useCart();
  const { setLastOrder, setCustomerDetails } = useOrder();

  const tableFromUrl = searchParams.get('table') || '';

  const [form, setForm] = useState<CustomerDetails>({
    fullName: '',
    mobileNumber: '',
    tableNumber: tableFromUrl,
    dateOfBirth: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<CustomerDetails> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }

    if (!form.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter your mobile number';
    } else if (!validateMobileNumber(form.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!form.tableNumber.trim()) {
      newErrors.tableNumber = 'Please enter your table number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      setSubmitError('Your cart is empty. Please add items before ordering.');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const orderId = generateOrderId();
    const orderedItems: OrderItem[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const orderData: Omit<Order, 'id'> = {
      order_id: orderId,
      customer_name: form.fullName.trim(),
      mobile_number: form.mobileNumber.replace(/\D/g, ''),
      table_number: form.tableNumber.trim(),
      date_of_birth: form.dateOfBirth,
      ordered_items: orderedItems,
      total_amount: totalAmount,
      order_status: 'NEW',
      created_at: new Date().toISOString()
    };

    try {
      const sent = await sendTelegramMessage(formatFoodOrderMessage(orderData));

      if (!sent) {
        console.error('Telegram notification failed to send.');
      }

      logOrderToSheet({
        orderId: orderData.order_id,
        customerName: orderData.customer_name,
        mobileNumber: orderData.mobile_number,
        tableNumber: orderData.table_number,
        items: orderedItems,
        totalAmount: orderData.total_amount
      });

      setLastOrder({ ...orderData, id: 0 } as Order);
      setCustomerDetails(form);
      clearCart();
      navigate('/confirmation');
    } catch (err) {
      console.error('Order submission error:', err);
      setSubmitError('Failed to place order. Please try again or call the hotel directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <main className="max-w-lg mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-semibold text-charcoal mb-2">No items in cart</h2>
          <p className="text-muted-foreground mb-6">Please add items before checkout.</p>
          <Button variant="primary" onClick={() => navigate('/menu')}>
            Browse Menu
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-8">
      <Header />

      <main className="max-w-lg mx-auto px-4 py-4">
        <h1 className="text-xl font-display font-semibold text-charcoal mb-4">
          Customer Details
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-border p-4 flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              error={errors.fullName}
              required
              autoComplete="name"
            />

            <Input
              label="Mobile Number"
              type="tel"
              placeholder="10-digit mobile number"
              value={form.mobileNumber}
              onChange={(e) => handleChange('mobileNumber', e.target.value)}
              error={errors.mobileNumber}
              required
              autoComplete="tel"
              maxLength={10}
              inputMode="numeric"
            />

            <Input
              label="Table Number / Table Name"
              placeholder="e.g., 12 or Window Seat"
              value={form.tableNumber}
              onChange={(e) => handleChange('tableNumber', e.target.value)}
              error={errors.tableNumber}
              required
            />
          </div>

          <div className="bg-white rounded-xl border border-border p-4">
            <h3 className="font-semibold text-charcoal mb-3">Order Summary</h3>

            <div className="flex flex-col gap-2 text-sm">
              {items.map((item) => (
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
              <span className="text-xl font-bold text-gold">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {submitError && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
              {submitError}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Placing Order...' : `PLACE ORDER • ${formatPrice(totalAmount)}`}
          </Button>
        </form>
      </main>
    </div>
  );
}

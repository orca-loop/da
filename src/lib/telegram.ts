// Sends a message straight to your Telegram bot from the browser.
// Set these two values in a `.env` file (see .env.example) before building/deploying.
const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

export async function sendTelegramMessage(text: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error(
      'Telegram is not configured. Add VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID to your .env file.'
    );
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML'
      })
    });
    const data = await res.json();
    return data.ok === true;
  } catch (err) {
    console.error('Failed to send Telegram message:', err);
    return false;
  }
}

// Builds a nicely formatted food order message
export function formatFoodOrderMessage(order: {
  order_id: string;
  customer_name: string;
  mobile_number: string;
  table_number: string;
  ordered_items: { name: string; price: number; quantity: number }[];
  total_amount: number;
}): string {
  const itemsList = order.ordered_items
    .map((i) => `• ${i.name} x${i.quantity} — ₹${i.price * i.quantity}`)
    .join('\n');

  return (
    `🍽️ <b>NEW FOOD ORDER</b>\n\n` +
    `<b>Order ID:</b> ${order.order_id}\n` +
    `<b>Name:</b> ${order.customer_name}\n` +
    `<b>Mobile:</b> ${order.mobile_number}\n` +
    `<b>Table:</b> ${order.table_number}\n\n` +
    `<b>Items:</b>\n${itemsList}\n\n` +
    `<b>Total: ₹${order.total_amount}</b>`
  );
}

// Builds a nicely formatted room booking enquiry message
export function formatRoomEnquiryMessage(enquiry: {
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: string;
  message?: string;
}): string {
  return (
    `🛏️ <b>NEW ROOM ENQUIRY</b>\n\n` +
    `<b>Name:</b> ${enquiry.name}\n` +
    `<b>Phone:</b> ${enquiry.phone}\n` +
    (enquiry.email ? `<b>Email:</b> ${enquiry.email}\n` : '') +
    `<b>Room Type:</b> ${enquiry.roomType === 'suite' ? 'Premium Suite' : 'Deluxe Room'}\n` +
    `<b>Check-in:</b> ${enquiry.checkIn}\n` +
    `<b>Check-out:</b> ${enquiry.checkOut}\n` +
    `<b>Guests:</b> ${enquiry.guests}\n` +
    (enquiry.message ? `<b>Message:</b> ${enquiry.message}\n` : '')
  );
}

// Builds a private low-rating feedback message (sent only to the manager, never public)
export function formatFeedbackMessage(feedback: {
  rating: number;
  comment: string;
  orderId?: string;
  customerName?: string;
  mobileNumber?: string;
}): string {
  const stars = '⭐'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
  return (
    `⚠️ <b>LOW RATING FEEDBACK</b>\n\n` +
    `<b>Rating:</b> ${stars} (${feedback.rating}/5)\n` +
    (feedback.orderId ? `<b>Order ID:</b> ${feedback.orderId}\n` : '') +
    (feedback.customerName ? `<b>Name:</b> ${feedback.customerName}\n` : '') +
    (feedback.mobileNumber ? `<b>Mobile:</b> ${feedback.mobileNumber}\n` : '') +
    `\n<b>Comment:</b>\n${feedback.comment}`
  );
}

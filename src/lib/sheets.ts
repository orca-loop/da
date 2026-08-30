// Sends order + review data to a Google Sheet via a free Apps Script Web App.
// See google-apps-script/OrderLogger.gs in this repo for the setup steps.
// Paste your deployment URL below (it ends in /exec).
const SHEETS_WEB_APP_URL = 'Phttps://script.google.com/macros/s/AKfycbzcNxiCZdQ9pCp-leho6CUPgP-pntPCvw9Fm_PXOpbxIY_ln2tf9g8tcBiP8lri2yvgAA/exec';

export async function logOrderToSheet(order: {
  orderId: string;
  customerName: string;
  mobileNumber: string;
  tableNumber: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
}): Promise<void> {
  if (!SHEETS_WEB_APP_URL || SHEETS_WEB_APP_URL.startsWith('PASTE_')) return;

  try {
    await fetch(SHEETS_WEB_APP_URL, {
      method: 'POST',
      // no-cors avoids a browser preflight the Apps Script endpoint doesn't handle;
      // we don't need to read the response, just fire-and-forget the log.
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        type: 'order',
        orderId: order.orderId,
        customerName: order.customerName,
        mobileNumber: order.mobileNumber,
        tableNumber: order.tableNumber,
        items: order.items.map((i) => `${i.name} x${i.quantity}`).join(', '),
        totalAmount: order.totalAmount
      })
    });
  } catch (err) {
    console.error('Failed to log order to sheet:', err);
  }
}

export async function logReviewToSheet(review: {
  orderId: string;
  rating: number;
  comment?: string;
}): Promise<void> {
  if (!SHEETS_WEB_APP_URL || SHEETS_WEB_APP_URL.startsWith('PASTE_')) return;

  try {
    await fetch(SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        type: 'review',
        orderId: review.orderId,
        rating: review.rating,
        comment: review.comment || ''
      })
    });
  } catch (err) {
    console.error('Failed to log review to sheet:', err);
  }
}

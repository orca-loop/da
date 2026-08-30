/**
 * HOTEL ORDER LOGGER — Google Apps Script
 *
 * SETUP:
 * 1. Create a new Google Sheet (this will be your order log + reports).
 * 2. In the sheet, go to Extensions → Apps Script.
 * 3. Delete any starter code and paste this entire file in.
 * 4. In the first row of "Sheet1", add these headers:
 *    Timestamp | Order ID | Customer Name | Mobile | Table | Items | Total | Rating | Feedback
 * 5. Click Deploy → New deployment → type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL (ends in /exec) — paste it into src/lib/sheets.ts
 *    as SHEETS_WEB_APP_URL in your website code.
 * 7. Re-deploy (Deploy → Manage deployments → edit → New version) any time
 *    you change this script.
 *
 * This is free — Google hosts and runs this script, no server needed.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const data = JSON.parse(e.postData.contents);

  if (data.type === 'order') {
    sheet.appendRow([
      new Date(),
      data.orderId || '',
      data.customerName || '',
      data.mobileNumber || '',
      data.tableNumber || '',
      data.items || '',
      data.totalAmount || '',
      '', // rating - filled in later when they review
      ''  // feedback - filled in later when they review
    ]);
  }

  if (data.type === 'review') {
    // Find the row with this order ID and fill in rating + feedback
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === data.orderId) {
        sheet.getRange(i + 1, 8).setValue(data.rating || '');
        sheet.getRange(i + 1, 9).setValue(data.comment || '');
        break;
      }
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * OPTIONAL: Weekly summary emailed to the owner every Monday morning.
 * To enable: in Apps Script, click the clock icon (Triggers) → Add Trigger →
 * choose "sendWeeklySummary" → Time-driven → Week timer → Monday, 8-9am.
 */
function sendWeeklySummary() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const rows = sheet.getDataRange().getValues();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  let orderCount = 0;
  let revenue = 0;
  const itemCounts = {};
  const hourCounts = {};
  let ratingSum = 0;
  let ratingCount = 0;

  for (let i = 1; i < rows.length; i++) {
    const [timestamp, , , , , items, total, rating] = rows[i];
    if (!timestamp || new Date(timestamp) < oneWeekAgo) continue;

    orderCount++;
    revenue += Number(total) || 0;

    const hour = new Date(timestamp).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;

    String(items)
      .split(',')
      .forEach((item) => {
        const name = item.trim().split(' x')[0];
        if (name) itemCounts[name] = (itemCounts[name] || 0) + 1;
      });

    if (rating) {
      ratingSum += Number(rating);
      ratingCount++;
    }
  }

  const topItems = Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => `${name} (${count})`)
    .join(', ');

  const busiestHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
  const avgRating = ratingCount ? (ratingSum / ratingCount).toFixed(1) : 'N/A';

  const body =
    `Weekly Order Summary\n\n` +
    `Orders: ${orderCount}\n` +
    `Revenue: ₹${revenue}\n` +
    `Average Rating: ${avgRating} (${ratingCount} reviews)\n` +
    `Top Items: ${topItems || 'N/A'}\n` +
    `Busiest Hour: ${busiestHour ? busiestHour[0] + ':00' : 'N/A'}\n`;

  MailApp.sendEmail({
    to: 'OWNER_EMAIL_HERE@example.com', // <-- change this
    subject: 'Your Weekly Hotel Order Summary',
    body: body
  });
}

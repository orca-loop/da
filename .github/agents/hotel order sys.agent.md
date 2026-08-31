---
name: hotel order sys
description: Describe what this custom agent does and when to use it.
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
# tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'todo'] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

Hotel Ordering Site Template

This repo is a reusable template: a React + Vite + TypeScript website for a
hotel/restaurant that lets guests order food to their table, book rooms, leave
feedback, and notifies the owner via Telegram. Orders and reviews are logged to
a Google Sheet via an Apps Script Web App (see `google-apps-script/OrderLogger.gs`).

When asked to "set up a new client" or "customize this for [business name]",
follow this process exactly.

## 1. Ask for anything missing from this list before starting

- Business name
- Logo file (transparent PNG preferred) and where the user has placed it
- Primary/accent color (hex, or a description like "deep green and gold")
- Address / area (for copy like "in the heart of X")
- Phone number for the "Call" buttons (with country code)
- WhatsApp number if different from the call number
- Telegram bot token + chat ID (tell them: get these from @BotFather and
  @userinfobot, and they go in `.env`, never committed)
- Google review link (from Google Business Profile → "Ask for reviews")
- Menu / room data: categories, item names, prices, descriptions, images
- Whether they want the Stay/rooms section at all, or food-ordering only
- Domain: will this deploy to GitHub Pages under a repo subpath (needs
  `basename` in `BrowserRouter` matching the repo name), a custom domain, or
  Vercel/Netlify (no basename needed)?

Do not guess these values or invent placeholder business details. If something
is missing, ask, then wait for the answer before editing files.

## 2. Files that change per client (edit these, nothing else structural)

- `.env` — Telegram bot token + chat ID (never commit this file)
- `src/config/*` or wherever branding constants live — business name, phone
  number, address, tagline copy
- `src/assets/generated/logo.*` — replace with the client's real logo file
- `tailwind.config.js` — update the `gold`/`charcoal`/etc. color values to the
  client's palette (keep the same variable *names* so components don't need
  touching — only change the hex values)
- `src/data/menu.ts` (or equivalent) — full menu/room data replaced
- `src/pages/Review.tsx` — `GOOGLE_REVIEW_LINK` constant
- `src/lib/sheets.ts` — `SHEETS_WEB_APP_URL` constant (each client needs their
  own Google Sheet + Apps Script deployment — walk them through
  `google-apps-script/OrderLogger.gs`'s setup comments)
- `src/main.tsx` — `basename` on `BrowserRouter`, only if deploying to GitHub
  Pages under a repo subpath; omit entirely for a custom domain or Vercel

## 3. Files that should NOT change between clients

Keep the architecture identical across clients so fixes and improvements can
be ported between them easily:
- Component structure (`Header.tsx`, `Logo.tsx`, `Button.tsx`, etc.)
- The review-flow logic in `Review.tsx` (rating → private feedback vs. public
  Google review) — this is deliberately built to comply with Google's review
  policy (ask every customer the same way, never filter negative feedback
  away from a private channel while gating positive ones to public review
  sites, never pre-write the public review text for them). Do not add
  star-based filtering that skips asking low-rating customers, and do not
  add auto-generated text for the customer to copy into their public review.
- `src/lib/telegram.ts` message formatting functions (only add new ones,
  don't restructure existing ones, so multiple clients stay compatible with
  the same Telegram bot commands if we build an owner dashboard later)
- The Google Apps Script logging schema (column order in the Sheet) — keep
  it consistent so a future shared reporting/AI-insights tool can read every
  client's sheet the same way

## 4. After making changes

- Run `npm run build` and fix any TypeScript errors before finishing
- Check that every hardcoded reference to the old business name, phone
  number, or address is gone (`grep -ri "hotel amrit"` as a sanity check,
  swapping in whatever the previous client's name was)
- Confirm `.env` is in `.gitignore` and not staged for commit
- Summarize exactly what was changed and what the client still needs to do
  manually (paste their .env values, deploy their own Apps Script, add
  GitHub Secrets, etc.) — don't assume those manual steps happened
# Hotel Amrit Website

React + Vite site with:
- Home page (Stay / Dine tabs)
- Room gallery + booking enquiry form (`/stay`) → sends to Telegram
- Food menu + cart + checkout (`/menu`, `/cart`, `/checkout`) → sends to Telegram
- Confirmation page after a food order

No backend/database — every order or enquiry is sent as a Telegram message to your phone. Nothing is stored anywhere else, so there's no admin dashboard (that was removed — it needed a database this project doesn't have).

## 1. Create your Telegram bot

1. Open Telegram, search for **@BotFather**, send `/newbot`, follow the prompts.
2. BotFather gives you a **bot token** like `123456789:AAExample...` — save it.
3. Send your new bot any message (e.g. "hi") so it can message you back.
4. Search for **@userinfobot**, start it, it replies with your **chat ID** (a number).

## 2. Run it locally to test

```
npm install
cp .env.example .env
```
Paste your bot token and chat ID into `.env`, then:
```
npm run dev
```
Place a test food order or send a test room enquiry — you should get a Telegram message within a second or two.

## 3. Deploy for free on GitHub Pages

1. Create a new GitHub repo and push this project to it.
2. In the repo: **Settings → Secrets and variables → Actions → New repository secret**. Add two secrets:
   - `VITE_TELEGRAM_BOT_TOKEN`
   - `VITE_TELEGRAM_CHAT_ID`
3. **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Push to the `main` branch (or run the workflow manually from the Actions tab). The included workflow (`.github/workflows/deploy.yml`) builds the site and publishes it automatically.
5. Your site goes live at `https://yourusername.github.io/yourreponame/`.

Every time you push a change, it redeploys automatically.

## Good to know: the bot token ends up in the browser

Since this site has no server, the finished page's JavaScript has to hold the Telegram bot token to call Telegram directly. That means anyone who inspects your site's code could find it and send messages through your bot (they can't read your other Telegram chats, only spam messages via that one bot). For a small family hotel this is a common, acceptable trade-off — but two tips:
- Don't reuse this bot token for anything else.
- If it's ever misused, message @BotFather → `/revoke` → generate a new token, update it in your GitHub secrets, and redeploy.

If you'd rather hide the token completely, a free Cloudflare Worker can proxy the request — ask and I'll set that up.

## Editing content

- **Menu items & prices**: `src/data/sampleMenu.ts`
- **Room types & prices**: `src/pages/Stay.tsx` and `src/pages/Home.tsx` (`roomTypes` array)
- **Phone number**: search for `+919111799982` across `src/pages/` and replace with your real number
- **Address**: bottom of `src/pages/Home.tsx`
- **Photos**: `src/assets/generated/`

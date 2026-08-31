/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_BOT_TOKEN: string;
  readonly VITE_TELEGRAM_CHAT_ID: string;
  readonly VITE_SHEETS_WEB_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

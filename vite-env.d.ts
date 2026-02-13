/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WS_URL?: string;
  // add any other VITE_ vars if you use
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

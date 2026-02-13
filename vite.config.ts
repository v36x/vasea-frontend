// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'  // 'node:' prefix use பண்ணு – safe

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // இப்போ __dirname work ஆகும்
    },
  },
})

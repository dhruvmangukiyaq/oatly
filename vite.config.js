import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev: forward API calls to the Express backend (run `npm run server`).
  server: {
    proxy: {
      '/api': 'http://localhost:8901',
    },
  },
})

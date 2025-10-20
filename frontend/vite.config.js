import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    // listen on port 3000 during `npm run dev`
    port: 3000,
  },
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    allowedHosts : ["d423-152-58-249-102.ngrok-free.app"]
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})

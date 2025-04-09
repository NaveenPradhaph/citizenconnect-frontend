import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   allowedHosts : ["citizenconnect-frontend.vercel.app"]
  // },
  plugins: [react()],
  base : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})

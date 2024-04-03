import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth' : {
        target: process.env.NODE_ENV == "production" ? 'https://plantpoppa-auth-render.onrender.com' : "http://localhost:8080",
        changeOrigin: true,
      }
    }
  }
})

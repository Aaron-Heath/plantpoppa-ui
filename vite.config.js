import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth' : {
        target: 'https://plantpoppa-auth-render.onrender.com',
        changeOrigin: true,
      },
      '/api' : {
        target: 'https://plantpoppa-auth-render.onrender.com',
        changeOrigin: true,
      }
    }
  }
})

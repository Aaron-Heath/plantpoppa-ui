import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      'http://localhost:8080*' : {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      '/auth' : {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      '/api' : {
        target: "http://localhost:8080",
        changeOrigin: true,
      }
    }
  }
})

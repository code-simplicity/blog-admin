import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 3010,
    host: "0.0.0.0",
    open: true,
    strictPort: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    }
  },
  plugins: [vue()]
})

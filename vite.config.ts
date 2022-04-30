/*
 * @Author: bugdr
 * @Date: 2022-04-28 17:45:07
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 09:40:39
 * @FilePath: \blog-admin\vite.config.ts
 * @Description: vite.config配置
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// 引入插件
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 3010,
    host: "0.0.0.0",
    open: true,
    strictPort: true,
    cors: true,
    // 配置代理
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AntDesignVueResolver()]
    }),
    Components({
      resolvers: [AntDesignVueResolver()]
    })]
})

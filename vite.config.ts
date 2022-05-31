import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import reactRefresh from '@vitejs/plugin-react-refresh';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: true,
    port: 3080,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        cookieDomainRewrite: '',
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    reactRefresh(),
    WindiCSS(),
    vitePluginImp({
      libList: [
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false,
        },
        {
          libName: 'antd',
          style(name) {
            // use less
            return `antd/es/${name}/style/index.js`;
          },
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
});

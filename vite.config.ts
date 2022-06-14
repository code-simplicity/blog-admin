/*
 * @Author: bugdr
 * @Date: 2022-05-30 22:13:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-14 22:45:24
 * @FilePath: \react-blog-admin\vite.config.ts
 * @Description:vite配置
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import vitePluginImp from 'vite-plugin-imp';
import reactRefresh from '@vitejs/plugin-react-refresh';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    // 别名
    alias: [
      { find: /\/@\//, replacement: pathResolve('src') + '/' },
      { find: /\/#\//, replacement: pathResolve('types') + '/' },
    ],
  },
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
    // 配置插件不支持IE11
    legacy({
      targets: ['default', 'not IE 11'],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(__dirname, 'src/design/index.less')}"`,
        },
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
});

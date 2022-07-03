/*
 * @Author: bugdr
 * @Date: 2022-05-30 22:13:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-03 11:04:48
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
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
  server: {
    host: true,
    port: 3090,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://106.13.233.140:8081',
        changeOrigin: true,
        cookieDomainRewrite: '',
        ws: true,
        // 重写路径
        rewrite: (path) => path.replace(/^\/api/, ''),
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

/*
 * @Author: bugdr
 * @Date: 2022-05-30 22:13:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-14 22:37:50
 * @FilePath: \react-blog-admin\src\main.tsx
 * @Description:
 */
import '/@/design/index.less';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '/@/design/index.less';
import 'virtual:windi.css';

// 创建root根节点
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

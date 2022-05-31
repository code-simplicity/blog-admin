/*
 * @Author: bugdr
 * @Date: 2022-05-30 22:13:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-31 08:52:34
 * @FilePath: \react-blog-admin\src\main.tsx
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'virtual:windi.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

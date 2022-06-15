/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:07:30
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-14 09:23:53
 * @FilePath: \react-blog-admin\src\router\index.ts
 * @Description: 路由表
 */
import { lazy } from 'react';
import { AppRouterRecordRaw } from './types';
// 异步路由

// 静态路由
export const staticRoute: AppRouterRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'Root',
  //   // 重定向
  //   Navigate: '',
  //   meta: {
  //     title: 'Root',
  //   },
  // },
  {
    path: '/login',
    name: 'Login',
    key: 'login',
    component: lazy(() => import('../views/sys/login/Login')),
    meta: {
      title: '登录',
    },
  },
];

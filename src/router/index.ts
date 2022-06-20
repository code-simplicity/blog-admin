/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:07:30
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 11:54:11
 * @FilePath: \react-blog-admin\src\router\index.ts
 * @Description: 路由表
 */
import { lazy } from 'react';
import { AppRouterRecordRaw } from './types';
import LayoutApp from '/@/layout/index';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/basic';
// 异步路由

// 静态路由
export const staticRoute: AppRouterRecordRaw[] = [
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

export const asyncRoute: AppRouterRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    key: 'Home',
    component: LayoutApp,
    navigate: '/home',
    meta: {
      title: '首页',
    },
    routes: [
      {
        path: 'home',
        name: 'Home',
        key: 'Home',
        component: LayoutApp,
        navigate: '/home',
        meta: {
          title: '首页',
        },
      },
    ],
  },
];

export const basicRoutes = [...staticRoute, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE];

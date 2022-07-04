/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:07:30
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-22 08:14:52
 * @FilePath: \react-blog-admin\src\router\index.ts
 * @Description: 路由表
 */
import { lazy } from 'react';
import { resolveRoute } from '../utils';

import { AppRouterRecordRaw } from './types';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/basic';

// 根路由
export const rootRoute: AppRouterRecordRaw[] = [
  {
    path: '/*',
    name: 'Root',
    meta: {
      title: 'Root',
    },
  },
];

// 异步路由
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList = resolveRoute(modules);

export const asyncRoute = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 静态路由
export const staticRoute: AppRouterRecordRaw = {
  path: '/login',
  name: 'Login',
  component: lazy(() => import('../views/sys/login/Login')),
  meta: {
    title: '登录',
  },
};

export const basicRoutes = [staticRoute, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE];

/*
 * @Author: bugdr
 * @Date: 2022-06-13 16:30:03
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 08:07:32
 * @FilePath: \react-blog-admin\src\router\basic.ts
 * @Description:基础路由，包括错误页面，404，重定向
 */

import { lazy } from 'react';
import { EXCEPTION_COMPONENT, LAYOUT, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from './constant';
import { AppRouterRecordRaw } from './types';

// 404
export const PAGE_NOT_FOUND_ROUTE: AppRouterRecordRaw = {
  path: '*',
  name: PAGE_NOT_FOUND_NAME,
  component: EXCEPTION_COMPONENT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
};

// 重定向
export const REDIRECT_ROUTE: AppRouterRecordRaw = {
  path: '/redirect',
  name: 'RedirectTo',
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:*',
      name: REDIRECT_NAME,
      component: lazy(() => import('/@/views/sys/redirect/index')),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};

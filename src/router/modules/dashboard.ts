/*
 * @Author: bugdr
 * @Date: 2022-06-20 14:44:01
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 22:27:49
 * @FilePath: \react-blog-admin\src\router\modules\dashboard.ts
 * @Description:仪表盘路由
 */

import { lazy } from 'react';
import { LAYOUT } from '../constant';
import { AppRouterRecordRaw } from '../types';

const dashboard: AppRouterRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    title: '工作台',
    orderNo: 1,
    icon: '',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: lazy(() => import('/@/views/dashboard/analysis/index')),
      meta: {
        title: '分析页',
        icon: '',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: lazy(() => import('/@/views/dashboard/workbench/index')),
      meta: {
        title: '工作台',
        icon: '',
      },
    },
  ],
};

export default dashboard;

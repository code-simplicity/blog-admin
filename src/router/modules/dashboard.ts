/*
 * @Author: bugdr
 * @Date: 2022-06-20 14:44:01
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 22:46:12
 * @FilePath: \react-blog-admin\src\router\modules\dashboard.ts
 * @Description:仪表盘路由
 */

import { lazy } from 'react';
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const dashboard: AppRouterRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  meta: {
    title: '工作台',
    orderNo: 1,
    icon: 'ion:grid-outline',
  },
  children: [
    {
      path: '/dashboard/analysis',
      name: 'analysis',
      component: LazyPromise('/@/views/dashboard/analysis/index'),
      meta: {
        title: '分析页',
        icon: 'carbon:driver-analysis',
      },
    },
    {
      path: '/dashboard/workbench',
      name: 'workbench',
      component: LazyPromise('/@/views/dashboard/workbench/index'),
      meta: {
        title: '工作台',
        icon: 'icon-park-outline:workbench',
      },
    },
  ],
};

export default dashboard;

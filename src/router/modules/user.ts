/*
 * @Author: bugdr
 * @Date: 2022-06-21 16:43:11
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 21:22:58
 * @FilePath: \react-blog-admin\src\router\modules\user.ts
 * @Description:用户管理
 */
import { lazy } from 'react';
import { LAYOUT } from '../constant';
import { AppRouterRecordRaw } from '../types';

const user: AppRouterRecordRaw = {
  path: '/user',
  name: 'user',
  component: LAYOUT,
  redirect: '/user/user-list',
  meta: {
    title: '用户管理',
    orderNo: 2,
    icon: 'ion:grid-outline',
  },
  children: [
    {
      path: '/user/user-list',
      name: '/user/user-list',
      component: lazy(() => import('/@/views/user/userList/index')),
      meta: {
        title: '用户列表',
        icon: 'carbon:driver-analysis',
      },
    },
  ],
};

export default user;

/*
 * @Author: bugdr
 * @Date: 2022-05-09 12:23:07
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-09 12:42:21
 * @FilePath: \blog-admin\src\router\routes\modules\operation.ts
 * @Description:运用管理
 */

import { LAYOUT } from '../../constant';
import { AppRouteModule } from '../../types';

const operation: AppRouteModule = {
  path: '/operation',
  name: 'Operation',
  component: LAYOUT,
  redirect: '/operation/looper-manage',
  meta: {
    title: '运营管理',
    icon: 'carbon:chat-operational',
    orderNo: 14,
  },
  children: [
    {
      path: 'looper-manage',
      name: 'LooperManage',
      component: () => import('/@/views/operation/looperManage/index.vue'),
      meta: {
        title: '轮播图管理',
        icon: 'carbon:carousel-horizontal',
      },
    },
    {
      path: 'category-manage',
      name: 'CategoryManage',
      component: () => import('/@/views/operation/categoryManage/index.vue'),
      meta: {
        title: '文章分类管理',
        icon: 'carbon:category-new-each',
      },
    },
  ],
};

export default operation;

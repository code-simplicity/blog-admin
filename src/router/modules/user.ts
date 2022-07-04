/*
 * @Author: bugdr
 * @Date: 2022-06-21 16:43:11
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-22 08:24:51
 * @FilePath: \react-blog-admin\src\router\modules\user.ts
 * @Description:用户管理
 */
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const user: AppRouterRecordRaw = {
  path: '/user',
  name: 'user',
  meta: {
    title: '用户管理',
    orderNo: 3,
    icon: 'ion:grid-outline',
  },
  children: [
    {
      path: '/user/user-list',
      name: '/user/user-list',
      component: LazyPromise('/@/views/user/userList/index'),
      meta: {
        title: '用户列表',
        icon: 'carbon:driver-analysis',
      },
    },
  ],
};

export default user;

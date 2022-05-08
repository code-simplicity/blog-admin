/*
 * @Author: bugdr
 * @Date: 2022-05-06 11:53:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-08 15:38:42
 * @FilePath: \blog-admin\src\router\routes\modules\user.ts
 * @Description:用户管理路由
 */
import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '../../constant';
import { t } from '/@/hooks/web/useI18n';

const user: AppRouteModule = {
  path: '/user',
  name: 'UserManagement',
  component: LAYOUT,
  redirect: '/user/list',
  meta: {
    icon: 'ion:people-outline',
    title: t('routes.dashboard.userManagement'),
    orderNo: 11,
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: () => import('/@/views/user/userList/index.vue'),
      meta: {
        title: t('routes.dashboard.userList'),
        icon: 'ion:list-circle-outline',
      },
    },
  ],
};

export default user;

/*
 * @Author: bugdr
 * @Date: 2022-05-06 11:53:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-06 12:43:12
 * @FilePath: \blog-admin\src\router\routes\modules\user.ts
 * @Description:用户管理路由
 */
import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '../../constant';
import { t } from '/@/hooks/web/useI18n';

const user: AppRouteModule = {
  path: '/user',
  name: 'userManagement',
  component: LAYOUT,
  redirect: '/user/list',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:people-outline',
    title: t('routes.dashboard.userManagement'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: () => import('/@/views/user/userList/index.vue'),
      meta: {
        title: t('routes.dashboard.userList'),
        icon: 'ion:list-circle-outline',
        hideMenu: true,
      },
    },
  ],
};

export default user;

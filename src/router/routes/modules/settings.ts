/*
 * @Author: bugdr
 * @Date: 2022-05-09 12:40:05
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-09 12:47:45
 * @FilePath: \blog-admin\src\router\routes\modules\settings.ts
 * @Description:系统设置
 */
import { LAYOUT } from '../../constant';
import { AppRouteModule } from '../../types';

const settings: AppRouteModule = {
  path: '/setting',
  name: 'Setting',
  component: LAYOUT,
  redirect: '/settings/friend-link',
  meta: {
    title: '系统设置',
    icon: 'clarity:network-settings-solid',
    orderNo: 15,
  },
  children: [
    {
      path: 'friend-link',
      name: 'FriendLink',
      component: () => import('/@/views/settings/friendLink/index.vue'),
      meta: {
        title: '友情链接',
        icon: 'la:user-friends',
      },
    },
    {
      path: '/app',
      name: 'SettingApp',
      component: () => import('/@/views/settings/app/index.vue'),
      meta: {
        title: 'App设置',
        icon: 'carbon:app',
      },
    },
  ],
};
export default settings;

// 系统设置
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const setting: AppRouterRecordRaw = {
  path: '/setting',
  name: 'setting',
  meta: {
    title: '系统设置',
    orderNo: 7,
    icon: 'clarity:network-settings-solid',
  },
  children: [
    {
      path: '/setting/app',
      name: '/setting/app',
      component: LazyPromise('/@/views/setting/appSetting/index'),
      meta: {
        title: '网站设置',
        icon: 'carbon:app',
      },
    },
    {
      path: '/setting/friend/link',
      name: '/setting/friend/link',
      component: LazyPromise('/@/views/setting/friendLink/index'),
      meta: {
        title: '友情链接',
        icon: 'la:user-friends',
      },
    },
  ],
};

export default setting;

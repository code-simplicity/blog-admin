// 图片管理
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const image: AppRouterRecordRaw = {
  path: '/image',
  name: 'image',
  meta: {
    title: '图片管理',
    orderNo: 5,
    icon: 'ion:grid-outline',
  },
  children: [
    {
      path: '/image/category/manage',
      name: '/image/category/manage',
      component: LazyPromise('/@/views/image/categoryManage/index'),
      meta: {
        title: '分类管理',
        icon: 'carbon:driver-analysis',
      },
    },
    {
      path: '/image/list/manage',
      name: '/image/list/manage',
      component: LazyPromise('/@/views/image/listManage/index'),
      meta: {
        title: '图片列表',
        icon: 'carbon:driver-analysis',
      },
    },
  ],
};

export default image;

// 图片管理
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const image: AppRouterRecordRaw = {
  path: '/image',
  name: 'image',
  meta: {
    title: '图片管理',
    orderNo: 5,
    icon: 'akar-icons:image',
  },
  children: [
    {
      path: '/image/category/manage',
      name: '/image/category/manage',
      component: LazyPromise('/@/views/image/categoryManage/index'),
      meta: {
        title: '分类管理',
        icon: 'bx:category-alt',
      },
    },
    {
      path: '/image/list/manage',
      name: '/image/list/manage',
      component: LazyPromise('/@/views/image/listManage/index'),
      meta: {
        title: '图片列表',
        icon: 'prime:images',
      },
    },
  ],
};

export default image;

// 运营管理
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const operation: AppRouterRecordRaw = {
  path: '/operation',
  name: 'operation',
  meta: {
    title: '网站运营',
    orderNo: 6,
    icon: 'ion:grid-outline',
  },
  children: [
    {
      path: '/operation/article/category/manage',
      name: '/operation/article/category/manage',
      component: LazyPromise('/@/views/operation/articleCategoryManage/index'),
      meta: {
        title: '文章分类',
        icon: 'carbon:driver-analysis',
      },
    },
    {
      path: '/operation/loop/manage',
      name: '/operation/loop/manage',
      component: LazyPromise('/@/views/operation/loopManage/index'),
      meta: {
        title: '轮播图管理',
        icon: 'carbon:driver-analysis',
      },
    },
  ],
};

export default operation;

/*
 * @Author: bugdr
 * @Date: 2022-05-09 11:58:26
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-09 12:09:07
 * @FilePath: \blog-admin\src\router\routes\modules\image.ts
 * @Description:图片管理
 */
import { LAYOUT } from '../../constant';
import { AppRouteModule } from '../../types';

const image: AppRouteModule = {
  path: '/image',
  name: 'Image',
  component: LAYOUT,
  redirect: '/image/image-list-manage',
  meta: {
    icon: 'akar-icons:image',
    title: '图片管理',
    orderNo: 13,
  },
  children: [
    {
      path: 'image-list-manage',
      name: 'ImageListManage',
      component: () => import('/@/views/images/imageListManage/index.vue'),
      meta: {
        title: '图片列表',
        icon: 'prime:images',
      },
    },
    {
      path: 'image-category-manage',
      name: 'ImageCategoryManage',
      component: () => import('/@/views/images/imageCategoryManage/index.vue'),
      meta: {
        title: '分类管理',
        icon: 'bx:category-alt',
      },
    },
  ],
};

export default image;

/*
 * @Author: bugdr
 * @Date: 2022-05-08 15:29:51
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-08 15:50:02
 * @FilePath: \blog-admin\src\router\routes\modules\content.ts
 * @Description:内容管理
 */
import { LAYOUT } from '../../constant';
import { AppRouteModule } from '../../types';

const content: AppRouteModule = {
  path: '/content',
  name: 'Content',
  component: LAYOUT,
  redirect: '/content/article',
  meta: {
    icon: 'fluent:content-settings-16-regular',
    title: '内容管理',
    orderNo: 12,
  },
  children: [
    {
      path: 'article-manage',
      name: 'ArticleManage',
      component: () => import('/@/views/content/articleManage/index.vue'),
      meta: {
        icon: 'ph:article-medium-light',
        title: '文章管理',
      },
    },
  ],
};

export default content;

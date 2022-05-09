/*
 * @Author: bugdr
 * @Date: 2022-05-09 12:11:50
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-09 12:18:06
 * @FilePath: \blog-admin\src\router\routes\modules\article.ts
 * @Description:发表文章
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const article: AppRouteModule = {
  path: '/article',
  name: 'Article',
  component: LAYOUT,
  redirect: '/article/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'majesticons:article-line',
    title: t('routes.dashboard.article'),
    orderNo: 11,
  },
  children: [
    {
      path: 'index',
      name: 'ArticlePage',
      component: () => import('/@/views/article/index.vue'),
      meta: {
        title: t('routes.dashboard.article'),
        icon: 'majesticons:article-line',
        hideMenu: true,
      },
    },
  ],
};

export default article;

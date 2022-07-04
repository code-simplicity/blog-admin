// 内容管理
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const content: AppRouterRecordRaw = {
  path: '/content',
  name: 'content',
  meta: {
    title: '内容管理',
    orderNo: 4,
    icon: 'fluent:content-settings-16-regular',
  },
  children: [
    {
      path: '/content/article/manage',
      name: '/content/article/manage',
      component: LazyPromise('/@/views/content/articleManage/index'),
      meta: {
        title: '文章管理',
        icon: 'ph:article-medium-light',
      },
    },
    {
      path: '/content/comment/manage',
      name: '/content/comment/manage',
      component: LazyPromise('/@/views/content/commentManage/index'),
      meta: {
        title: '评论管理',
        icon: 'bx:comment-detail',
      },
    },
    {
      path: '/content/message/manage',
      name: '/content/message/manage',
      component: LazyPromise('/@/views/content/messageManage/index'),
      meta: {
        title: '留言管理',
        icon: 'bx:message-dots',
      },
    },
  ],
};

export default content;

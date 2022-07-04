// 发表文章
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const article: AppRouterRecordRaw = {
  path: '/article',
  name: 'article',
  meta: {
    title: '文章发布',
    orderNo: 2,
    icon: 'majesticons:article-line',
  },
  component: LazyPromise('/@/views/article/index'),
};

export default article;

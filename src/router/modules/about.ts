// 关于
import { AppRouterRecordRaw } from '../types';
import { LazyPromise } from '/@/utils';

const about: AppRouterRecordRaw = {
  path: '/about',
  name: 'about',
  meta: {
    title: '关于',
    orderNo: 10, // 排序
    icon: 'simple-icons:about-dot-me',
  },
  component: LazyPromise('/@/views/about/index'),
};
export default about;

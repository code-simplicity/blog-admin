/*
 * @Author: bugdr
 * @Date: 2022-06-20 14:04:42
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-22 00:11:43
 * @FilePath: \react-blog-admin\src\components\Loading\Loading.tsx
 * @Description:加载中的组件
 */

import { Spin } from 'antd';
import { FC } from 'react';
import Progress from '../Progress/Progress';
import style from './index.module.less';

const Loading: FC = () => {
  // 做一个优化，
  return (
    <section className={style['full-loading']}>
      <Spin delay={300} size="large" tip="正在加载中..." spinning={true}></Spin>
    </section>
  );
};

export default Loading;

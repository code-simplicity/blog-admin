/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:39
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 20:45:22
 * @FilePath: \react-blog-admin\src\layout\content\index.tsx
 * @Description:
 */
import { Layout } from 'antd';
import { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes, useRoutes } from 'react-router-dom';
const { Content } = Layout;
import style from './index.module.less';
import Loading from '/@/components/Loading/Loading';
import { asyncRoute } from '/@/router/index';
import Analysis from '/@/views/dashboard/analysis';

const LayoutContent: React.FC = () => {
  return (
    <Content className={style['site-layout-background']}>
      {/* 提供路由占位符 */}
      <Outlet />
    </Content>
  );
};
export default LayoutContent;

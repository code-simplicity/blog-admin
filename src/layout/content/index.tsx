/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:39
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-22 08:26:30
 * @FilePath: \react-blog-admin\src\layout\content\index.tsx
 * @Description:
 */
import { Layout } from 'antd';
import { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
const { Content } = Layout;
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import style from './index.module.less';
import Loading from '/@/components/Loading/Loading';
import { asyncRoute } from '/@/router';

const LayoutContent: React.FC = () => {
  // 获取location的能力,变化之后进入路由
  const location = useLocation();
  console.log('location', location);

  const routerViews = (routerList: any) => {
    if (routerList && routerList.length) {
      return routerList.map((route: any) => {
        // 递归二级子组件
        if (route.children && route.children.length) {
          return routerViews(route.children);
        }
        return (
          <Route
            path={route.path}
            key={route.path}
            element={
              <Suspense fallback={<Loading />}>
                <route.component />
              </Suspense>
            }
          ></Route>
        );
      });
    }
  };
  return (
    <Content className={style['site-layout-background']}>
      <TransitionGroup>
        <CSSTransition timeout={300} key={location.pathname} exit={false} className={style['fade']}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/analysis"></Navigate>}></Route>
            {routerViews(asyncRoute)}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      {/* 提供路由占位符 */}
      <Outlet />
    </Content>
  );
};
export default LayoutContent;

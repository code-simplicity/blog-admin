/*
 * @Author: bugdr
 * @Date: 2022-05-29 11:04:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 22:42:00
 * @FilePath: \react-blog-admin\src\App.tsx
 * @Description:
 */
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { asyncRoute, basicRoutes } from '/@/router/index';
import { Suspense } from 'react';
import '/@/design/app.less';
import Loading from '/@/components/Loading/Loading';
import { PageEnum } from './utils/enums/PageEnum';

function App() {
  // 递归函数遍历路由
  const routerViews = (routerList) => {
    if (routerList && routerList.length) {
      return routerList.map((route: any) => {
        return route.children && route.children.length ? (
          <Route
            path={route.path}
            key={route.name}
            element={
              <Suspense fallback={<Loading />}>
                <route.component />
              </Suspense>
            }
          >
            {/* 遍历子路由 */}
            {routerViews(route.children)}
            {route.redirect ? (
              <Route
                path={route.path}
                key={route.name}
                element={<Navigate to={route.redirect}></Navigate>}
              ></Route>
            ) : (
              <Route
                path={route.path}
                key={route.name}
                element={<Navigate to={route.children[0].path} />}
              ></Route>
            )}
          </Route>
        ) : (
          <Route
            path={route.path}
            key={route.name}
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
    <Router>
      {/* Switch被替换成了Routes */}
      <Routes>
        {/* 公共路由 */}
        {basicRoutes.map((route: any) => {
          if (route.path === '/') {
            // 根路由，重定向到首页
            return (
              <Route
                path={route.path}
                key={route.namn}
                element={<Navigate to={PageEnum.BASE_HOME}></Navigate>}
              ></Route>
            );
          }
          return (
            <Route
              path={route.path}
              key={route.name}
              element={
                <Suspense fallback={<Loading />}>
                  <route.component />
                </Suspense>
              }
            ></Route>
          );
        })}
        {/* 异步路由,只有存在用户的token和管理员权限才可以触发这个 */}
        {routerViews(asyncRoute)}
      </Routes>
    </Router>
  );
}

export default App;

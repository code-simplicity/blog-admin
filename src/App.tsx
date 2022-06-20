/*
 * @Author: bugdr
 * @Date: 2022-05-29 11:04:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 13:53:09
 * @FilePath: \react-blog-admin\src\App.tsx
 * @Description:
 */
import LayoutApp from './layout';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { basicRoutes } from '/@/router/index';
import { Suspense } from 'react';
import '/@/design/app.less';

function App() {
  console.log('basicRoutes', basicRoutes);
  return (
    <Router>
      {/* Switch被替换成了Routes */}
      <Routes>
        {/* 公共路由 */}
        {basicRoutes.map((item: any) => {
          return (
            <Route
              key={item.key}
              path={item.path}
              element={
                <Suspense fallback={<div>路由懒加载...</div>}>
                  <item.component />
                </Suspense>
              }
            ></Route>
          );
        })}
        {/* 异步路由,只有存在用户的token和管理员权限才可以触发这个 */}
        <Route path="/" element={<LayoutApp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

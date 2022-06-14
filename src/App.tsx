/*
 * @Author: bugdr
 * @Date: 2022-05-29 11:04:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-14 21:51:16
 * @FilePath: \react-blog-admin\src\App.tsx
 * @Description:
 */
import LayoutApp from './layout';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { staticRoute } from '/@/router/index';
import { Suspense } from 'react';
import '/@/design/app.less';

function App() {
  return (
    <Router>
      {/* Switch被替换成了Routes */}
      <Routes>
        {/* 公共路由 */}
        {staticRoute.map((item: any) => {
          return (
            <Route
              key={item['key']}
              path={item.path}
              element={
                <Suspense fallback={<div>路由懒加载...</div>}>
                  <item.component />
                </Suspense>
              }
            ></Route>
          );
        })}
        {/* 异步路由 */}
        <Route path="/home" element={<LayoutApp />}>
          <Route index></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

/*
 * @Author: bugdr
 * @Date: 2022-05-29 11:04:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 23:08:36
 * @FilePath: \react-blog-admin\src\App.tsx
 * @Description:
 */
import { HashRouter, Routes, Route } from 'react-router-dom';
import { staticRoute } from '/@/router/index';
import { Suspense } from 'react';
import '/@/design/app.less';
import Loading from '/@/components/Loading/Loading';
import LayoutApp from './layout';

function App() {
  return (
    <HashRouter>
      {/* Switch被替换成了Routes */}
      <Routes>
        {/* 公共路由,登录页面 */}
        <Route
          path="/login"
          key="login"
          element={
            <Suspense fallback={<Loading />}>
              <staticRoute.component />
            </Suspense>
          }
        ></Route>
        {/* 异步路由,只有存在用户的token和管理员权限才可以触发这个 */}
        {/* 这里会做一个重定向的判断，判断用户是否登录，未登陆那就跳转到登录界面 */}
        <Route path="/*" element={<LayoutApp />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

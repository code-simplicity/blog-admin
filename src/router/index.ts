/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:07:30
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 16:28:05
 * @FilePath: \react-blog-admin\src\router\index.ts
 * @Description: 路由表
 */
// 异步路由

// 根路由
export const RootRoute = {
  path: '/',
  name: 'Root',
  // 重定向
  Navigate: '',
  meta: {
    title: 'Root',
  },
};
// 登录路由
export const LoginRoute = {
  path: '/login',
  name: 'Login',
  element: '',
  meta: {
    title: '登录',
  },
};
// 同步路由
export const basicRouter = [RootRoute, LoginRoute];

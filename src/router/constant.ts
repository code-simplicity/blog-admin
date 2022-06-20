/*
 * @Author: bugdr
 * @Date: 2022-06-20 11:12:03
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 22:09:47
 * @FilePath: \react-blog-admin\src\router\constant.ts
 * @Description:静态路由导入
 */

import { lazy } from 'react';

// 重定向
export const REDIRECT_NAME = 'Redirect';

// 页面丢失
export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

// LAYOUT
export const LAYOUT = lazy(() => import('/@/layout/index'));

// 错误页面的封装
export const EXCEPTION_COMPONENT = () => import('/@/views/sys/error/ExceptionError');

/*
 * @Author: bugdr
 * @Date: 2022-06-20 11:12:03
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 22:13:50
 * @FilePath: \react-blog-admin\src\router\constant.ts
 * @Description:静态路由导入
 */

import { lazy } from 'react';
import { LazyPromise } from '../utils';

// 重定向
export const REDIRECT_NAME = 'Redirect';

// 页面丢失
export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

// 错误页面
export const ERROR_PAGE = 'ErrorPage';

// LAYOUT
export const LAYOUT = LazyPromise('/@/layout/index');

// 错误页面的封装
export const EXCEPTION_COMPONENT = LazyPromise('/@/views/sys/error/ExceptionError');

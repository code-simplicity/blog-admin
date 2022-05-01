/*
 * @Author: bugdr
 * @Date: 2022-04-29 18:05:06
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 19:38:03
 * @FilePath: \blog-admin\src\router\routes\basic.ts
 * @Description: 基础路由
 */
import type { AppRouteRecordRaw } from "../types";
import { PAGE_NOT_FOUND_NAME, LAYOUT, REDIRECT_NAME } from '../constant'

// 404
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
    path: '/:path(.*)*',
    name: PAGE_NOT_FOUND_NAME,
    component: LAYOUT,
    meta: {
        title: 'ErrorPage'
    },
    children: [
        {
            path: '/:path(.*)*',
            name: PAGE_NOT_FOUND_NAME,
            component: LAYOUT,
            meta: {
                title: 'ErrorPage'
            },
        }
    ]
}

// 重定向
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
    path: '/redirect',
    name: "Redirect",
    component: LAYOUT,
    meta: {
        title: REDIRECT_NAME
    },
    // children: [
    //     {
    //         path: '/redirect/:path(.*)',
    //         name: REDIRECT_NAME,
    //         component: LAYOUT,
    //         meta: {
    //             title: REDIRECT_NAME
    //         },
    //     }
    // ]
}

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
    path: '/error-log',
    name: 'ErrorLog',
    component: LAYOUT,
    redirect: '/error-log/list',
    meta: {
        title: 'ErrorLog',
        hideBreadcrumb: true,
        hideChildrenInMenu: true,
    },
    children: [
        {
            path: 'list',
            name: 'ErrorLogList',
            component: () => import('../../views/system/error-log/index.vue'),
            meta: {
                title: '错误',
                hideBreadcrumb: true,
                currentActiveMenu: '/error-log',
            },
        },
    ],
};

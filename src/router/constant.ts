/*
 * @Author: bugdr
 * @Date: 2022-04-30 19:25:28
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 19:31:39
 * @FilePath: \blog-admin\src\router\constant.ts
 * @Description: 路由常量
 */
// 页面未找到
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
// 父layout
export const PARENT_LAYOUT_NAME = 'ParentLayout'
// 重定向
export const REDIRECT_NAME = 'Redirect'

// 之外的路由
// export const EXCEPTION_COMPONENT = () => import('/@/views/sys/exception/Exception.vue');

// layout
export const LAYOUT = () => import('../layout/default/index.vue')

export const getParentLayout = (_name?: string) => {
    return () => new Promise((resolve) => {
        resolve({
            name: PARENT_LAYOUT_NAME
        })
    })
}

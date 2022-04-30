/*
 * @Author: bugdr
 * @Date: 2022-04-29 18:04:47
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 20:04:20
 * @FilePath: \blog-admin\src\router\routes\index.ts
 * @Description: 
 */
import type { AppRouteRecordRaw } from '../types'
import { PageEnum } from '../../enums/pageEnum'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'

// 引入模块路由模块,通过木块查询
const modules = import.meta.globEager('./modules/**/*.ts')
const routeModuleList: AppRouteRecordRaw[] = []

// 解析模块
Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
})

// 异步路由需要加载
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]
console.log('asyncRoutes', asyncRoutes)

// 根路由
export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: "Root"
    }
}

/**
 * 登录路由
 */
export const LoginRoute: AppRouteRecordRaw = {
    path: "/login",
    name: "Login",
    component: () => import("../../views/system/sign/signIn.vue"),
    meta: {
        title: "登录"
    }
}
export const basicRoutes = [
    LoginRoute,
    RootRoute,
    REDIRECT_ROUTE,
    PAGE_NOT_FOUND_ROUTE
]
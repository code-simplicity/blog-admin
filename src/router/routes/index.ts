import type { AppRouteRecordRaw } from '../types'
import System from "./modules/system"
import { PageEnum } from '../../enums/pageEnum'

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
    RootRoute
]
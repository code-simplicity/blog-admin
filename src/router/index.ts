import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue';
import { basicRoutes } from "./routes"
console.log('basicRoutes', basicRoutes)

// 获取白名单路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) => {
    array.forEach((item) => {
        WHITE_NAME_LIST.push(item.name)
        // 递归获取子路由名称
        getRouteNames(item.children || [])
    })
}
// 调用函数
getRouteNames(basicRoutes)
export const router = createRouter({
    history: createWebHashHistory(),
    routes: basicRoutes as unknown as RouteRecordRaw[],
    scrollBehavior: () => ({ left: 0, top: 0 })
})

// 路由拦截
router.beforeEach(() => {

})

// 路由之后
router.afterEach(() => {

})
export function setupRouter(app: App<Element>) {
    app.use(router);
}
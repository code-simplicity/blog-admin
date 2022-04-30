import { defineStore } from 'pinia'
import { store } from '../index'
import { useUserStore } from './user'
import { toRaw } from 'vue'
import { asyncRoutes } from '../../router/routes'
import { PAGE_NOT_FOUND_ROUTE } from '../../router/routes/basic'
import { AppRouteRecordRaw, Menu } from '../../router/types'
import { PageEnum } from '../../enums/pageEnum'

interface PermissionState {
    // Whether the route has been dynamically added
    isDynamicAddedRoute: boolean;
    // To trigger a menu update
    lastBuildMenuTime: number;
    // Backstage menu list
    backMenuList: Menu[];
    frontMenuList: Menu[];
}
export const usePermissionStore = defineStore({
    id: 'app-permission',
    state: (): PermissionState => ({
        // 是否动态添加路由
        isDynamicAddedRoute: false,
        // 最后构建菜单时间
        lastBuildMenuTime: 0,
        // 后台菜单列表
        backMenuList: [],
        // 前端菜单列表
        frontMenuList: []
    }),
    getters: {
        getBackMenuList(): Menu[] {
            return this.backMenuList
        },
        getFrontMenuList(): Menu[] {
            return this.frontMenuList;
        },
        getLastBuildMenuTime(): number {
            return this.lastBuildMenuTime;
        },
        getIsDynamicAddedRoute(): boolean {
            return this.isDynamicAddedRoute;
        },
    },
    actions: {
        setFrontMenuList(list: Menu[]) {
            this.frontMenuList = list;
        },
        setBackMenuList(list: Menu[]) {
            this.backMenuList = list
            list?.length > 0 && this.setLastBuildMenuTime()
        },
        setLastBuildMenuTime() {
            this.lastBuildMenuTime = new Date().getTime();
        },
        setDynamicAddedRoute(added: boolean) {
            this.isDynamicAddedRoute = added;
        },
        resetState(): void {
            this.isDynamicAddedRoute = false;
            this.backMenuList = [];
            this.lastBuildMenuTime = 0;
        },
        // 编译路由
        async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
            const userStore = useUserStore();
            let routes: AppRouteRecordRaw[] = []
            const roleList = toRaw(userStore.getRoleList) || []

            // 路由过滤
            const routeFilter = (route: AppRouteRecordRaw) => {
                const { meta } = route;
                const { roles } = meta || {};
                if (!roles) return true;
                return roleList.some((role) => roles.includes(role));
            }

            // 去除过滤
            const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
                const { meta } = route;
                const { ignoreRoute } = meta || {};
                return !ignoreRoute;
            };

            const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
                if (!routes || routes.length === 0) return;
                let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
                function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
                    if (parentPath) parentPath = parentPath + '/';
                    routes.forEach((route: AppRouteRecordRaw) => {
                        const { path, children, redirect } = route;
                        const currentPath = path.startsWith('/') ? path : parentPath + path;
                        if (currentPath === homePath) {
                            if (redirect) {
                                homePath = route.redirect! as string;
                            } else {
                                route.meta = Object.assign({}, route.meta, { affix: true });
                                throw new Error('end');
                            }
                        }
                        children && children.length > 0 && patcher(children, currentPath);
                    });
                }
                try {
                    patcher(routes);
                } catch (e) {
                    // 已处理完毕跳出循环
                }
                return;
            };
            // switch (permissionMode) {
            //     case PermissionModeEnum.ROLE:
            //         routes = filter(asyncRoutes, routeFilter);
            //         routes = routes.filter(routeFilter);
            //         // Convert multi-level routing to level 2 routing
            //         routes = flatMultiLevelRoutes(routes);
            //         break;

            //     case PermissionModeEnum.ROUTE_MAPPING:
            //         routes = filter(asyncRoutes, routeFilter);
            //         routes = routes.filter(routeFilter);
            //         const menuList = transformRouteToMenu(routes, true);
            //         routes = filter(routes, routeRemoveIgnoreFilter);
            //         routes = routes.filter(routeRemoveIgnoreFilter);
            //         menuList.sort((a, b) => {
            //             return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
            //         });

            //         this.setFrontMenuList(menuList);
            //         // Convert multi-level routing to level 2 routing
            //         routes = flatMultiLevelRoutes(routes);
            //         break;

            //     //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
            //     case PermissionModeEnum.BACK:
            //         const { createMessage } = useMessage();

            //         createMessage.loading({
            //             content: t('sys.app.menuLoading'),
            //             duration: 1,
            //         });

            //         // !Simulate to obtain permission codes from the background,
            //         // this function may only need to be executed once, and the actual project can be put at the right time by itself
            //         let routeList: AppRouteRecordRaw[] = [];
            //         try {
            //             this.changePermissionCode();
            //             routeList = (await getMenuList()) as AppRouteRecordRaw[];
            //         } catch (error) {
            //             console.error(error);
            //         }

            //         // Dynamically introduce components
            //         routeList = transformObjToRoute(routeList);

            //         //  Background routing to menu structure
            //         const backMenuList = transformRouteToMenu(routeList);
            //         this.setBackMenuList(backMenuList);

            //         // remove meta.ignoreRoute item
            //         routeList = filter(routeList, routeRemoveIgnoreFilter);
            //         routeList = routeList.filter(routeRemoveIgnoreFilter);

            //         routeList = flatMultiLevelRoutes(routeList);
            //         routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
            //         break;
            // }

            // routes.push(ERROR_LOG_ROUTE);
            patchHomeAffix(routes);
            return routes;
        }
    }
})

export function usePermissionStoreWithOut() {
    return usePermissionStore(store);
}
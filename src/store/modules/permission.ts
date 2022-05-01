import { defineStore } from 'pinia'
import { store } from '../index'
import { useUserStore } from './user'
import { toRaw } from 'vue'
import { asyncRoutes } from '../../router/routes'
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '../../router/routes/basic'
import { AppRouteRecordRaw, Menu } from '../../router/types'
import { PageEnum } from '../../enums/pageEnum'
import { useAppStore } from './app'
import projectSetting from '../../settings/projectSetting'
import { PermissionModeEnum } from '../../enums/appEnum'
import { filter } from '../../utils/helper/treeHelper'
import { flatMultiLevelRoutes, transformObjToRoute } from '../../router/helper/routeHelper'
import { transformRouteToMenu } from '../../router/helper/menuHelper'

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
            const userStore = useUserStore()
            const appStore = useAppStore()
            // 路由
            let routes: AppRouteRecordRaw[] = []
            // 获取角色列表
            const roleList = toRaw(userStore.getRoleList) || []
            // 权限缓存
            const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig
            // 路由信息过滤
            const routeFilter = (route: AppRouteRecordRaw) => {
                // 获取路由元信息
                const { meta } = route;
                // 获取角色表
                const { roles } = meta || {};
                if (!roles) return true;
                // 返回角色表
                return roleList.some((role) => roles.includes(role));
            }

            // 去除不用关注的过滤
            const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
                const { meta } = route;
                const { ignoreRoute } = meta || {};
                return !ignoreRoute;
            };

            /**
             * 固定首页
             * @param routes 
             * @returns 
             */
            const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
                if (!routes || routes.length === 0) return;
                // 获取首页
                let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
                function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
                    if (parentPath) parentPath = parentPath + '/';
                    routes.forEach((route: AppRouteRecordRaw) => {
                        // 路由解构
                        const { path, children, redirect } = route;
                        const currentPath = path.startsWith('/') ? path : parentPath + path;
                        if (currentPath === homePath) {
                            if (redirect) {
                                // 路由重定向
                                homePath = route.redirect! as string;
                            } else {
                                // 路由元信息拷贝
                                route.meta = Object.assign({}, route.meta, { affix: true });
                                throw new Error('end');
                            }
                        }
                        // 递归调用
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
            // 判断执行的模块，通过角色权限
            switch (permissionMode) {
                case PermissionModeEnum.ROLE:
                    routes = filter(asyncRoutes, routeFilter);
                    routes = routes.filter(routeFilter);
                    // Convert multi-level routing to level 2 routing
                    routes = flatMultiLevelRoutes(routes);
                    break;

                case PermissionModeEnum.ROUTE_MAPPING:
                    routes = filter(asyncRoutes, routeFilter);
                    routes = routes.filter(routeFilter);
                    const menuList = transformRouteToMenu(routes, true);
                    routes = filter(routes, routeRemoveIgnoreFilter);
                    routes = routes.filter(routeRemoveIgnoreFilter);
                    menuList.sort((a, b) => {
                        return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
                    });

                    this.setFrontMenuList(menuList);
                    // Convert multi-level routing to level 2 routing
                    routes = flatMultiLevelRoutes(routes);
                    break;

                //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
                case PermissionModeEnum.BACK:
                    // const { createMessage } = useMessage();

                    // createMessage.loading({
                    //     content: t('sys.app.menuLoading'),
                    //     duration: 1,
                    // });
                    // this function may only need to be executed once, and the actual project can be put at the right time by itself
                    let routeList: AppRouteRecordRaw[] = [];
                    try {
                        // routeList = (await getMenuList()) as AppRouteRecordRaw[];
                    } catch (error) {
                        console.error(error);
                    }

                    // Dynamically introduce components
                    routeList = transformObjToRoute(routeList);

                    //  Background routing to menu structure
                    const backMenuList = transformRouteToMenu(routeList);
                    this.setBackMenuList(backMenuList);

                    // remove meta.ignoreRoute item
                    routeList = filter(routeList, routeRemoveIgnoreFilter);
                    routeList = routeList.filter(routeRemoveIgnoreFilter);

                    routeList = flatMultiLevelRoutes(routeList);
                    routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
                    break;
            }

            routes.push(ERROR_LOG_ROUTE);
            patchHomeAffix(routes);
            return routes;
        }
    }
})

export function usePermissionStoreWithOut() {
    return usePermissionStore(store);
}
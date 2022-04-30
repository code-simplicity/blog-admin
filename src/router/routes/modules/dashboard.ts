/*
 * @Author: bugdr
 * @Date: 2022-04-30 19:47:40
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 19:58:00
 * @FilePath: \blog-admin\src\router\routes\modules\dashboard.ts
 * @Description: 工作台
 */
import type { AppRouteModule } from "../../types";

import { LAYOUT } from "../../constant";

const dashboard: AppRouteModule = {
    path: '/dashboard',
    name: "Dashboard",
    component: LAYOUT,
    redirect: '/dashboard/analysis',
    meta: {
        title: '工作台'
    },
    children: [
        {
            path: 'analysis',
            name: 'Analysis',
            component: () => import('../../../views/dashboard/analysis/index.vue'),
            meta: {
                title: '博客分析'
            }
        },
        {
            path: 'workbench',
            name: 'Workbench',
            component: () => import('../../../views/dashboard/workbench/index.vue'),
            meta: {
                title: '工作台'
            }
        }
    ]
}
export default dashboard
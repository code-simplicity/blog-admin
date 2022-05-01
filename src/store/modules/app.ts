/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:39:57
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 09:52:49
 * @FilePath: \blog-admin\src\store\modules\app.ts
 * @Description: app-store
 */
import { defineStore } from 'pinia'
import { store } from '../index'
import { resetRouter } from '../../router/index'
import { ProjectConfig } from '../../../types/config'
import { deepMerge } from '../../utils'
import { PROJ_CFG_KEY } from '../../enums/cacheEnum'
import { Persistent } from '../../utils/cache/persistent'
interface AppState {
    // 页面加载
    pageLoading: boolean
    // 项目配置
    projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        pageLoading: false,
        projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    }),
    getters: {
        getProjectConfig(): ProjectConfig {
            return this.projectConfig || ({} as ProjectConfig)
        }
    },
    actions: {
        setProjectConfig(config: any): void {
            this.projectConfig = deepMerge(this.projectConfig || {}, config)
        }
    }
})

export function useAppStoreWithOut() {
    return useAppStore(store)
}
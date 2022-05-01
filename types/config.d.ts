/*
 * @Author: bugdr
 * @Date: 2022-05-01 08:50:39
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 09:09:39
 * @FilePath: \blog-admin\src\types\config.d.ts
 * @Description: 项目配置类型
 */
import { CacheTypeEnum } from "../src/enums/cacheEnum";
import { PermissionModeEnum, RouterTransitionEnum } from '../src/enums/appEnum'
export interface ProjectConfig {
    // 权限缓存类型
    permissionCacheType: CacheTypeEnum;
    // 权限模式
    permissionMode: PermissionModeEnum
    // Session timeout processing
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
}

// 全局环境配置
export interface GlobEnvConfig {
    // Site title
    VITE_GLOB_APP_TITLE: string;
    // Service interface url
    VITE_GLOB_API_URL: string;
    // Service interface url prefix
    VITE_GLOB_API_URL_PREFIX?: string;
    // Project abbreviation
    VITE_GLOB_APP_SHORT_NAME: string;
    // Upload url
    VITE_GLOB_UPLOAD_URL?: string;
}

export interface TransitionSetting {
    //  Whether to open the page switching animation
    enable: boolean;
    // Route basic switching animation
    basicTransition: RouterTransitionEnum;
    // Whether to open page switching loading
    openPageLoading: boolean;
    // Whether to open the top progress bar
    openNProgress: boolean;
}
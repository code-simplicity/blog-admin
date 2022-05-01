/*
 * @Author: bugdr
 * @Date: 2022-05-01 09:07:36
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 09:08:39
 * @FilePath: \blog-admin\src\enums\appEnum.ts
 * @Description: app-enums
 */
/**
 * 权限模式
 */
export enum PermissionModeEnum {
    // 角色
    ROLE = 'ROLE',
    // 后端
    BACK = 'BACK',
    // route mapping
    ROUTE_MAPPING = 'ROUTE_MAPPING',
}

//  Route switching animation
export enum RouterTransitionEnum {
    ZOOM_FADE = 'zoom-fade',
    ZOOM_OUT = 'zoom-out',
    FADE_SIDE = 'fade-slide',
    FADE = 'fade',
    FADE_BOTTOM = 'fade-bottom',
    FADE_SCALE = 'fade-scale',
}
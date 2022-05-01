/*
 * @Author: bugdr
 * @Date: 2022-04-29 17:40:19
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 08:12:02
 * @FilePath: \blog-admin\src\router\types.ts
 * @Description: 
 */
// 路由类型约束
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';
import { RoleEnum } from '../enums/roleEnum'

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string;
    meta: RouteMeta;
    component?: Component | string;
    components?: Component;
    children?: AppRouteRecordRaw[];
    fullPath?: string;
}

// 菜单标签
export interface MenuTag {
    type?: 'primary' | 'error' | 'warn' | 'success';
    content?: string;
    dot?: boolean;
}

export interface Menu {
    name: string;

    icon?: string;

    path: string;

    // path contains param, auto assignment.
    paramPath?: string;

    disabled?: boolean;

    children?: Menu[];

    orderNo?: number;

    roles?: RoleEnum[];

    meta?: Partial<RouteMeta>;

    tag?: MenuTag;

    hideMenu?: boolean;
}

export interface MenuModule {
    orderNo?: number;
    menu: Menu;
}

export type AppRouteModule = AppRouteRecordRaw;
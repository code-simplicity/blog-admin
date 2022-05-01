/*
 * @Author: bugdr
 * @Date: 2022-04-29 10:55:43
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 09:46:08
 * @FilePath: \blog-admin\src\utils\index.ts
 * @Description: 封装工具
 */
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import { isObject } from './is'
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
    if (!route) return route;
    const { matched, ...opt } = route;
    return {
        ...opt,
        matched: (matched
            ? matched.map((item) => ({
                meta: item.meta,
                name: item.name,
                path: item.path,
            }))
            : undefined) as RouteRecordNormalized[],
    };
}
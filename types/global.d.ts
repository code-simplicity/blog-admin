/*
 * @Author: bugdr
 * @Date: 2022-05-01 09:16:41
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 09:44:41
 * @FilePath: \blog-admin\types\global.d.ts
 * @Description: 全局类型
 */

// import type {
//     VNode,
//     VNodeChild,
//     ComponentPublicInstance,
//     FunctionalComponent,
//     PropType as VuePropType,
// } from 'vue';


declare global {
    // app-information
    const __APP_INFO__: {
        pkg: {
            name: string
            version: string
            dependencies: Recordable<string>;
            devDependencies: Recordable<string>;
        }
    }
    type Recordable<T = any> = Record<string, T>;
    // 深度遍历
    type DeepPartial<T> = {
        [p in keyof T]?: DeepPartial<T[p]>
    }
    declare type Nullable<T> = T | null;
}
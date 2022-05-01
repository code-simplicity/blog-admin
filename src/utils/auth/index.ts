/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:46:45
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 16:41:25
 * @FilePath: \blog-admin\src\utils\auth\index.ts
 * @Description:用户封装的方法
 */

import { CacheTypeEnum, TOKEN_KEY } from '../../enums/cacheEnum'
import projectSetting from '../../settings/projectSetting'
import { BasicKeys, Persistent } from '../cache/persistent'

const { permissionCacheType } = projectSetting
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL

export function getToken() {
    return getAutoCache(TOKEN_KEY)
}

/**
 * 获取缓存
 * @param key 
 * @returns 
 */
export function getAutoCache<T>(key: BasicKeys) {
    const fn = isLocal ? Persistent.getLocal : Persistent.getSession
    return fn(key) as T
}

/**
 * 设置缓存
 * @param key 
 * @param value 
 * @returns 
 */
export function setAutoCache(key: BasicKeys, value: any) {
    const fn = isLocal ? Persistent.setLocal : Persistent.setLocal
    return fn(key, value, true)
}

/**
 * 
 * @param immediate 全部清除缓存
 * @returns 
 */
export function clearAuthCache(immediate = true) {
    const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
    return fn(immediate)
}
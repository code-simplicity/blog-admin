/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:46:45
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 16:41:25
 * @FilePath: \blog-admin\src\utils\auth\index.ts
 * @Description:用户封装的方法
 */
import {
    createLocalStorage,
    getLocalStorage,
    clearLocalStorage
} from '../cache/index'
/**
 * 获取缓存
 * @param key 
 * @returns 
 */
export function getAutoCache<T>(key: string) {
    return getLocalStorage(key)
}

/**
 * 设置缓存
 * @param key 
 * @param value 
 * @returns 
 */
export function setAutoCache(key: string, value: any) {
    createLocalStorage(key, value)
}

/**
 * 
 * @param immediate 全部清除缓存
 * @returns 
 */
export function clearAuthCache(immediate = true) {
    clearLocalStorage()
}
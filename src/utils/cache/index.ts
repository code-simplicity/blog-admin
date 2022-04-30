/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:47:04
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 16:34:10
 * @FilePath: \blog-admin\src\utils\cache\index.ts
 * @Description: 创建缓存的工具
*/
/**
 * 创建localstorage
 * @param key 
 * @param value 
 * @returns 
 */
export function createLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, value)
}

/**
 * 获取
 * @param key 
 * @param value 
 * @returns 
 */
export function getLocalStorage(key: string) {
    return localStorage.getItem(key)
}

/**
 * 删除全部
 */
export function clearLocalStorage() {
    return localStorage.clear()
}
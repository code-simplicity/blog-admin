/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:47:04
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 16:34:10
 * @FilePath: \blog-admin\src\utils\cache\index.ts
 * @Description: 创建缓存的工具
*/
import { DEFAULT_CACHE_TIME, enableStorageEncryption } from "../../settings/encryptionSetting"
import { getStorageShortName } from "../env"
import { createStorage as create, CreateStorageParams } from "./storageCache"

export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
    return {
        hasEncrypt: enableStorageEncryption,
        storage,
        prefixKey: getStorageShortName(),
        ...options
    }
}

export const WebStorage = create(createOptions(sessionStorage))

/**
 * 创建缓存
 * @param storage 
 * @param options 
 * @returns 
 */
export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
    return create(createOptions(storage, options))
}

/**
 * 创建createSessionStorage
 * @param options 
 * @returns 
 */
export const createSessionStorage = (options: Options = {}) => {
    return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

/**
 * 创建createLocalStorage
 * @param options 
 * @returns 
 */
export const createLocalStorage = (options: Options = {}) => {
    return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export default WebStorage;
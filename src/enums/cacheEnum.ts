/*
 * @Author: bugdr
 * @Date: 2022-04-30 14:06:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 08:53:34
 * @FilePath: \blog-admin\src\enums\cacheEnum.ts
 * @Description: 缓存的key
 */
// token-key
export const TOKEN_KEY = 'TOKEN__'
// user-info-key
export const USER_INFO_KEY = 'USER__INFO__'
// roles-key
export const ROLES_KEY = 'ROLES__'

// project config key
export const PROJ_CFG_KEY = 'PROJ__CFG__KEY__';

// base global local key
export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__';

// base global session key
export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__';

// lock info
export const LOCK_INFO_KEY = 'LOCK__INFO__KEY__';

export enum CacheTypeEnum {
    SESSION,
    LOCAL,
}

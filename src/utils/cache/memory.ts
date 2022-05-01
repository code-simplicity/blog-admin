/*
 * @Author: bugdr
 * @Date: 2022-05-01 10:34:04
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 10:37:23
 * @FilePath: \blog-admin\src\utils\cache\memory.ts
 * @Description: 内存工具
 */
export interface Cache<V = any> {
    // 缓存的值
    value?: V;
    // 超时的id
    timeoutId?: ReturnType<typeof setTimeout>;
    time?: number;
    // 存在的
    alive?: number
}

const NOT_ALIVE = 0

// 构建存储类
export class Memory<T = any, V = any> {
    private cache: { [key in keyof T]?: Cache<V> } = {};
    private alive: number;
    // 构造器
    constructor(alive = NOT_ALIVE) {
        this.alive = alive * 1000
    }

    // 获取缓存
    get getCache() {
        return this.cache
    }

    setCache(cache: any) {
        this.cache = cache
    }

    get<K extends keyof T>(key: K) {
        return this.cache[key];
    }

    /**
     * 
     * @param key key
     * @param value 值
     * @param expires 过期时间
     */
    set<K extends keyof T>(key: K, value: V, expires?: number) {
        let item = this.get(key);

        if (!expires || (expires as number) <= 0) {
            expires = this.alive;
        }
        if (item) {
            if (item.timeoutId) {
                clearTimeout(item.timeoutId);
                item.timeoutId = undefined;
            }
            item.value = value;
        } else {
            item = { value, alive: expires };
            this.cache[key] = item;
        }

        if (!expires) {
            return value;
        }
        const now = new Date().getTime();
        item.time = expires > now ? expires : now + expires;
        item.timeoutId = setTimeout(
            () => {
                this.remove(key);
            },
            expires > now ? expires - now : expires,
        );

        return value;
    }

    // 移除
    remove<K extends keyof T>(key: K) {
        const item = this.get(key)
        Reflect.deleteProperty(this.cache, key)
        if (item) {
            clearTimeout(item.timeoutId)
            return item.value
        }
    }

    // 重置缓存
    resetCache(cache: { [K in keyof T]: Cache }) {
        Object.keys(cache).forEach((key) => {
            const k = key as any as keyof T;
            const item = cache[k];
            if (item && item.time) {
                const now = new Date().getTime();
                const expire = item.time;
                if (expire > now) {
                    this.set(k, item.value, expire);
                }
            }
        })
    }

    clear() {
        Object.keys(this.cache).forEach((key) => {
            const item = this.cache[key]
            item.timeoutId && clearTimeout(item.timeoutId)
        })
        this.cache = {}
    }
}
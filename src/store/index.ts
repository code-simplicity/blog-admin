/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:40:10
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 11:01:57
 * @FilePath: \blog-admin\src\store\index.ts
 * @Description: Pinia
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app: App<Element>) {
    app.use(store)
}
export { store }
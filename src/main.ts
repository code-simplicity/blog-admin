/*
 * @Author: bugdr
 * @Date: 2022-04-28 17:45:07
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 14:36:42
 * @FilePath: \blog-admin\src\main.ts
 * @Description: 配置
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
// 引入tailwindcss样式
import './assets/css/index.css'
import 'ant-design-vue/dist/antd.css'
// 引入animate.css动画
import 'animate.css'
import { setupStore } from './store/index'


const app = createApp(App)
app.use(router)
setupStore(app)
app.mount("#app")

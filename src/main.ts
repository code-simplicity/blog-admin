import { createApp } from 'vue'
import Antd from "ant-design-vue"
import App from './App.vue'
import router from "./router/index"
// 引入tailwindcss样式
import './assets/css/index.css'
import 'ant-design-vue/dist/antd.css'


const app = createApp(App)
app.use(Antd)
app.use(router)
app.mount("#app")

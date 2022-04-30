/*
 * @Author: bugdr
 * @Date: 2022-04-29 10:38:11
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 10:04:55
 * @FilePath: \blog-admin\src\utils\http\request.ts
 * @Description: axios接口请求封装
 */
/**
 * @Author: bugdr
 * @description: axios封装
 * @param {*}
 * @return {*}
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { useRouter } from 'vue-router'
import { showMessage } from './status'

// 连接池
const pendingPool = new Map()
// 路由跳转
const router = useRouter()

const BASE_URL = import.meta.env.VITE_BASE_URL

const request = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    timeout: 600000
})

/**
 * @Author: bugdr
 * @description: 请求拦截
 * @param {*}
 * @return {*}
 */
request.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const controller = new AbortController()
        config.signal = controller.signal
        pendingPool.set(config.url, controller)
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

/**
 * @Author: bugdr
 * @description: 响应拦截
 * @param {*}
 * @return {*}
 */
request.interceptors.response.use(
    (res: AxiosResponse) => {
        const { config, data } = res
        pendingPool.delete(config.url)
        return data
    },
    (error: AxiosError) => {
        const { config } = error
        if (!axios.isCancel(error)) {
            pendingPool.delete(config.url)
        }
        // 返回错误的请求
        const { response } = error
        if (response) {
            showMessage(response.status)
            return Promise.reject(response.data)
        } else {
            if (axios.isCancel(error)) {
                throw new axios.Cancel(error.message)
            } else if (error.stack && error.stack.includes("timeout")) {
                showMessage("请求超时！")
            } else {
                showMessage("连接服务器异常！")
            }
        }
        return Promise.reject(error)
    }
)
export { request }
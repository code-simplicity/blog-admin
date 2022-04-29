/**
 * @Author: bugdr
 * @description: axios封装
 * @param {*}
 * @return {*}
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { useRouter } from 'vue-router'

// 连接池
const pendingPool = new Map()

const instance = axios.create({
    withCredentials: true,
    baseURL: ''
})

/**
 * @Author: bugdr
 * @description: 请求拦截
 * @param {*}
 * @return {*}
 */
instance.interceptors.request.use(
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
instance.interceptors.response.use(
    (res: AxiosResponse) => {
        const { config } = res
        pendingPool.delete(config.url)
        return res
    },
    (error: AxiosError) => {
        const { config } = error
        if (!axios.isCancel(error)) {
            pendingPool.delete(config.url)
        }
        // 返回错误的请求
        const { response } = error
        if (response) {
            // 状态码判断
            switch (response.status) {

            }
        }
    }
)
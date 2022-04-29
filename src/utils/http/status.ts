/**
 * @Author: bugdr
 * @description: 状态码
 * @param {*}
 * @return {*}
 */
import { useRouter } from 'vue-router'
const router = useRouter()
export const showMessage = (status: number | string): string => {
    let message = ''
    switch (status) {
        case 400:
            message = "请求错误（400）"
            break
        case 401:
            message = "请求错误（400）"
            break
        default:
            message = `连接出错(${status})!`
    }
    return `${message}, 请检查网络或联系管理员！`
}
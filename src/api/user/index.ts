import { request } from "../../utils/http/request"
import { User } from './type'
/**
 * 登录
 * @param data 
 * @returns 
 */
export const login = (data: User) => {
    return request({
        url: "/",
        method: "post",
        data
    })
} 
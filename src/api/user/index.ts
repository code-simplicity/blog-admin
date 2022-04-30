/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:56:15
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 14:42:42
 * @FilePath: \blog-admin\src\api\user\index.ts
 * @Description: 用户接口
 */
import { request } from "../../utils/http/request"
import { UserLoginModel } from './type'

/**
 * 登录
 * 
 * @param data {username password}
 * @param captcha 
 * @returns 
 */
export const login = (params: UserLoginModel) => {
    const { captcha, ...data } = params
    return request({
        url: `/user/login/${captcha}/`,
        method: "post",
        data
    })
}

/**
 * 通过检查token判断是否登录
 */
export const checkTokenUserInfo = () => {
    return request({
        url: '/user/check-token',
        method: 'get'
    })
}
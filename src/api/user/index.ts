/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:56:15
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 09:06:24
 * @FilePath: \blog-admin\src\api\user\index.ts
 * @Description: 用户接口
 */
import { request } from "../../utils/http/request"
import User from './type'
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
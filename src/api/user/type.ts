/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:56:27
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 15:12:50
 * @FilePath: \blog-admin\src\api\user\type.ts
 * @Description: 用户接口类型
 */

/**
 * 登录接口类型
 */
export interface UserLoginModel {
    userName: string,
    password: string,
    captcha: string
}

/**
 * 获取用户信息的接口
 */
export interface GetUserInfoModel {
    id: string | number
    userName: string
    email: string,
    roles: string,
    avatar: string,
    sign: string,
    state: string,
    regIp: string,
    loginIp: string,
}
/*
 * @Author: bugdr
 * @Date: 2022-04-29 20:19:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 15:01:13
 * @FilePath: \blog-admin\src\types\login.ts
 * @Description: 登录类型
 */
export default interface UserModel {
    userName?: string,
    password?: string,
    captcha?: string,
    remember?: boolean
}
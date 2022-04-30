/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:56:27
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 09:05:30
 * @FilePath: \blog-admin\src\api\user\type.ts
 * @Description: 用户接口类型
 */
export default interface User {
    userName: string,
    email: string,
    roles: string,
    avatar: string,
    sign: string,
}
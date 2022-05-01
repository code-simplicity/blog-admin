/*
 * @Author: bugdr
 * @Date: 2022-04-30 11:12:42
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 11:15:15
 * @FilePath: \blog-admin\src\types\stroe.d.ts
 * @Description: store状态类型
 */
export interface UserInfo {
    homePath?: string;
    id: string | number,
    userName: string,
    roles: string,
    avatar: string,
    email: string,
    sign: string,
    state: string | number,
    regIp: string,
    loginIp: string
}
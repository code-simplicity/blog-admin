/*
 * @Author: bugdr
 * @Date: 2022-04-30 13:30:17
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 14:48:08
 * @FilePath: \blog-admin\src\types\result.ts
 * @Description: 返回结果类型封装
 */
// 定义返回类型
export interface ResultResponse {
    code: string | number
    data: [] | {}
    message: string
    success: boolean
}

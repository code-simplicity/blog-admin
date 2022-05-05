/*
 * @Author: bugdr
 * @Date: 2022-05-05 17:32:22
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-05 17:33:38
 * @FilePath: \blog-admin\src\utils\resultResponse\index.ts
 * @Description:统一返回结果
 */
// 统一返回结果
export interface ResultResponse {
  success?: boolean;
  code: string | number;
  message: string | number;
  result: any | {} | null;
}

// 用户信息统一返回结果
export interface UserInfoResultResponse {
  success?: boolean;
  code: string | number;
  message: string | number;
  result: any | {} | null;
  homePath: string | any;
}

/*
 * @Author: bugdr
 * @Date: 2022-06-19 12:28:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-19 12:29:41
 * @FilePath: \react-blog-admin\src\api\user\userType.ts
 * @Description:用户返回接口的类型
 */

// 登录用户
export interface LoginParams {
  userName?: string;
  password?: string;
  captcha?: string;
}

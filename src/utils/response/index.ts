/*
 * @Author: bugdr
 * @Date: 2022-06-19 12:24:47
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-19 12:27:09
 * @FilePath: \react-blog-admin\src\utils\response\index.ts
 * @Description:结果的返回
 */

// 统一结果返回封装
export enum ResponseCode {
  SUCCESS = 20000, // 操作成功
  LOGIN_SUCCESS = 20001, // 登录成功
  JOIN_IN_SUCCESS = 20002, // 注册成功
  FAILED = 40000, // 操作失败
  GET_RESOURCE_FAILED = 40001, // 获取资源失败
  ACCOUNT_NOT_LOGIN = 40002, // 账户未登录
  ROLE_TOURIST = 40010, // 游客登录
  PERMISSION_DENIED = 40011, // 无权限操作
  ACCOUNT_DENIED = 40003, // 账户被禁止
  ERROR_403 = 40004, // 权限不足
  ERROR_404 = 40004, // 页面丢失
  ERROR_504 = 40004, // 系统繁忙，请稍后重试
  ERROR_505 = 40004, // 请求错误，请检查数据是否正确
  WAiTING_FOR_SCAN = 40004, // 等待扫码
  QR_CODE_DEPRECATE = 40004, // 二维码已过期
  LOGIN_FAILED = 40004, // 登录失败
}

// 返回结果的接口约束
export interface ResultResponse {
  success?: boolean;
  code: string | number;
  message: string | number;
  result: any | null;
}

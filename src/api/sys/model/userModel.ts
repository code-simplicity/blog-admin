/*
 * @Author: bugdr
 * @Date: 2022-05-02 14:03:09
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-03 10:45:50
 * @FilePath: \blog-admin\src\api\sys\model\userModel.ts
 * @Description:
 */
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  userName: string;
  password: string;
  captcha: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  // 返回结果为result，也就是只有token
  result: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  id: string | number;
  // 用户角色
  roles: RoleInfo[];
  // 用户名
  userName: string;
  // 邮箱
  email: string;
  // 头像
  avatar: string;
  // 注册ip
  regIp?: string;
  // 签名
  sign?: string;
  // 状态
  state: string | number;
}

export interface CheckTokenModel {
  result: GetUserInfoModel | any;
}

/**
 * 注册的提交类型
 */
export interface RegisterModel {
  captcha_code: string | number;
  email_code: string | number;
  email: string | number;
  password: string | number;
  userName: string | number;
}

// 统一返回结果
export interface ResultResponse {
  success?: boolean;
  code: string | number;
  message: string | number;
  result: any | {} | null;
}

// 邮箱发送参数规范
export interface EmailCodeParams {
  email?: string;
  captchaCode?: string;
  type?: string;
}

/*
 * @Author: bugdr
 * @Date: 2022-05-02 14:03:09
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-03 10:13:47
 * @FilePath: \blog-admin\src\api\sys\user.ts
 * @Description:用户登录
 */
import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  CheckTokenModel,
  RegisterModel,
  ResultResponse,
  EmailCodeParams,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/user/login/',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  checkTokenUsee = '/user/check-token',
  GetPermCode = '/getPermCode',
  Register = '/user/join_in',
  EmailCode = '/user/verify_code',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const { captcha, ...data } = params;
  return defHttp.post<LoginResultModel>(
    {
      url: `${Api.Login}${captcha}/`,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * 解析token，判断用户是否登录
 * @returns
 */
export function getCheckTokenUserInfo() {
  return defHttp.get<CheckTokenModel>({ url: Api.checkTokenUsee });
}

/**
 * 获取用户信息
 * @returns
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

/**
 * 发送邮箱验证码
 * @param params
 * @returns
 */
export function sendEmailCode(params: EmailCodeParams) {
  return defHttp.get<ResultResponse>({
    url: Api.EmailCode,
    params,
  });
}

/**
 * 用户注册
 * @returns
 */
export function doRegister(params: RegisterModel) {
  return defHttp.post({
    url: Api.Register,
    params,
  });
}

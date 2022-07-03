/*
 * @Author: bugdr
 * @Date: 2022-06-19 12:10:04
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-03 21:32:53
 * @FilePath: \react-blog-admin\src\api\user\user.ts
 * @Description:用户接口封装
 */
import { LoginParams } from './userType';
import { defHttp } from '/@/utils/http/index';
import { ResultResponse } from '/@/utils/response';

enum UserApi {
  Login = '/user/login/',
  GetUserInfo = '/user/check-token',
  Logout = '/user/logout',
}

/**
 * 登录接口
 * @param params
 * @returns
 */
export const login = (params: LoginParams) => {
  const { captcha, ...data } = params;
  return defHttp.post<ResultResponse>({
    url: `${UserApi.Login}${captcha}/`,
    data,
  });
};

/**
 * 获取用户信息，通过解析redis的token值
 * @returns
 */
export const getUserInfo = () => {
  return defHttp.get({
    url: `${UserApi.GetUserInfo}`,
  });
};

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return defHttp.get({
    url: `${UserApi.Logout}`,
  });
};

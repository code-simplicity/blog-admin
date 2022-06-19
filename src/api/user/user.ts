/*
 * @Author: bugdr
 * @Date: 2022-06-19 12:10:04
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-19 12:30:04
 * @FilePath: \react-blog-admin\src\api\user\user.ts
 * @Description:用户接口封装
 */
import { LoginParams } from './userType';
import { defHttp } from '/@/utils/http/index';
import { ResultResponse } from '/@/utils/response';

enum Api {
  Login = '/user/login/',
}

export const LoginApi = (params: LoginParams) => {
  const { captcha, ...data } = params;
  return defHttp.post<ResultResponse>({
    url: `${Api.Login}${captcha}/`,
    data,
  });
};

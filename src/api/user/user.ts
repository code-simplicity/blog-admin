/*
 * @Author: bugdr
 * @Date: 2022-05-06 17:56:42
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-08 10:27:20
 * @FilePath: \blog-admin\src\api\user\user.ts
 * @Description:用户管理
 */

import { DeleteUserParams, ResetPasswordParams, UserListParams } from './model/userModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  UserList = '/user/list',
  ResetPassword = '/user/reset-password/',
  DeleteUser = '/user/',
}

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export function getUserList(params: UserListParams) {
  return defHttp.get<ResultResponse>({
    url: Api.UserList,
    params,
  });
}

/**
 * 重置密码
 * @param params
 * @returns
 */
export function resetPassword(params: ResetPasswordParams) {
  const { userId, password } = params;
  return defHttp.put<ResultResponse>({
    url: `${Api.ResetPassword}${userId}?password=${password}`,
  });
}

/**
 * 删除用户
 * @param params
 * @returns
 */
export function deleteUser(params: DeleteUserParams) {
  return defHttp.delete({
    url: `${Api.DeleteUser}${params}`,
  });
}

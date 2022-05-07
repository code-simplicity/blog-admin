/*
 * @Author: bugdr
 * @Date: 2022-05-06 17:56:42
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-06 18:04:24
 * @FilePath: \blog-admin\src\api\user\user.ts
 * @Description:用户管理
 */

import { UserListParams } from './model/userModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  UserList = '/user/list',
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

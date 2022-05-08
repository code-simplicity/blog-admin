/*
 * @Author: bugdr
 * @Date: 2022-05-06 18:00:55
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-08 10:26:48
 * @FilePath: \blog-admin\src\api\user\model\userModel.ts
 * @Description:用户模块
 */
// 获取用户参数约束列表
export interface UserListParams {
  email: string | number;
  userName: string | number;
  page: string | number;
  size: string | number;
}

// 重置用户密码
export interface ResetPasswordParams {
  userId: string | number;
  password: string | number;
}

// 删除用户参数
export interface DeleteUserParams {
  userId: string | number;
}

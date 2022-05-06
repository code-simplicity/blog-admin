/*
 * @Author: bugdr
 * @Date: 2022-05-06 18:00:55
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-06 18:02:39
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

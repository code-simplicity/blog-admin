/*
 * @Author: bugdr
 * @Date: 2022-06-19 13:23:58
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-19 13:25:13
 * @FilePath: \react-blog-admin\types\store.d.ts
 * @Description:store全局的接口
 */

// 用户信息
export interface UserInfo {
  // 用户id
  id: string;
  // 用户角色
  roles: [];
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
  homePath?: string;
}

export interface App {
  isMobile: boolean;
}

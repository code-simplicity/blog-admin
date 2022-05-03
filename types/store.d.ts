/*
 * @Author: bugdr
 * @Date: 2022-05-02 14:03:14
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-03 10:15:32
 * @FilePath: \blog-admin\types\store.d.ts
 * @Description:
 */
import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
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
  homePath?: string;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

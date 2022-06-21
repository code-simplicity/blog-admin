/*
 * @Author: bugdr
 * @Date: 2022-06-13 16:31:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 16:26:49
 * @FilePath: \react-blog-admin\src\router\types.ts
 * @Description:路由参数类型
 */
// 路由参数的配置
export interface AppRouterRecordRaw {
  path?: string;
  name?: string;
  children?: AppRouterRecordRaw[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  key?: string;
  component?: any;
  meta?: object;
  redirect?: string;
}

/*
 * @Author: bugdr
 * @Date: 2022-06-13 16:31:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 22:20:09
 * @FilePath: \react-blog-admin\src\router\types.ts
 * @Description:路由参数类型
 */
// 菜单类型，是一级菜单还是二级菜单
type MenuType = 'menu' | 'subMenu';
// 路由参数的配置
export interface AppRouterRecordRaw {
  path?: string;
  name?: string;
  routes?: AppRouterRecordRaw[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  key?: string;
  type?: MenuType;
}

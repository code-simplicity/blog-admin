/*
 * @Author: bugdr
 * @Date: 2022-06-21 14:08:59
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 22:08:11
 * @FilePath: \react-blog-admin\src\layout\sider\type.tsx
 * @Description:类型约束
 */
import { MenuProps } from 'antd';
import { Key, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { PAGE_NOT_FOUND_NAME } from '/@/router/constant';

type MenuItem = Required<MenuProps>['items'][number];

export interface MenuItemType {
  [x: string]: ReactNode | Key | null | MenuItem[];
  children: MenuItem[];
  routeMenuList: [];
}
// 获取到菜单的Item
export const getItem = (props: MenuItemType): MenuItem => {
  const { path, meta, children } = props;
  const { title, icon } = meta;
  let childrenItem: MenuItem[] = [];
  // 如果children存在，那么就递归
  if (children && children.length) {
    // 循环
    childrenItem = children.map((item: any) => {
      return getItem(item);
    });
  }

  return {
    label: title,
    key: path,
    icon: <Icon icon={icon}></Icon>,
    children: childrenItem.length ? childrenItem : undefined,
  } as MenuItem;
};

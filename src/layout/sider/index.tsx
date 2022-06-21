/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:16
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 16:41:56
 * @FilePath: \react-blog-admin\src\layout\sider\index.tsx
 * @Description:侧边栏
 */
import React, { useEffect } from 'react';
import LayoutSider from './LayoutSider';
import DrawerLayoutSider from './DrawerLayoutSider';
import { asyncRoute } from '/@/router';
import { getItem, MenuItemType } from './type';

const Sider: React.FC = () => {
  // 对菜单进行循环编译
  const initAsyncRouterList = (routeList: MenuItemType[]) => {
    return routeList.map((route) => {
      return getItem(route);
    });
  };

  // 通过查询屏幕宽度获取设备的值，创建两个组件,第一个组件是抽屉的，用于在移动端显示的
  // 判断设备,返回侧边栏应该显示哪一种
  const Sider = () => {
    const isMobile = false;
    return isMobile ? (
      <DrawerLayoutSider routeMenuList={initAsyncRouterList(asyncRoute)} />
    ) : (
      <LayoutSider routeMenuList={initAsyncRouterList(asyncRoute)} />
    );
  };
  return <Sider />;
};

export default Sider;

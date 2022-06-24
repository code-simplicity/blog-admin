/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:16
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 16:41:56
 * @FilePath: \react-blog-admin\src\layout\sider\index.tsx
 * @Description:侧边栏
 */
import React, { useEffect, useState } from 'react';
import LayoutSider from './LayoutSider';
import DrawerLayoutSider from './DrawerLayoutSider';
import { asyncRoute } from '/@/router';
import { getItem, MenuItemType } from './type';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsMobile,
  setMenuDrawerVisible,
  setMenuSiderCollapsed,
} from '/@/store/modules/appSlice';

const Sider: React.FC = () => {
  // 对菜单进行循环编译
  const initAsyncRouterList = (routeList: MenuItemType[]) => {
    return routeList.map((route) => {
      return getItem(route);
    });
  };

  // 通过查询屏幕宽度获取设备的值，创建两个组件,第一个组件是抽屉的，用于在移动端显示的
  // 判断设备,返回侧边栏应该显示哪一种
  // 通过监听屏幕宽度的变化实现，判断当前的屏幕宽度是否小于800
  const { isMobile, menuDrawerVisible, menuSiderCollapsed, collapsed } = useSelector(
    (store: any) => store.app,
  );
  const dispatch = useDispatch();
  // 屏幕可视宽度
  const getClientWidth = () => {
    const initWidth = window.document.documentElement.clientWidth;
    // 是移动设备
    // 触发设备状态变化
    dispatch(setIsMobile(initWidth <= 800 ? true : false));
    // 显示弹窗菜单
    dispatch(setMenuDrawerVisible(isMobile ? true : false));
    // 关闭正常的缩放,判断是否是移动设备
    dispatch(
      setMenuSiderCollapsed(isMobile && menuDrawerVisible ? false : collapsed ? true : false),
    );
  };

  useEffect(() => {
    getClientWidth();
    // 触发屏幕监听函数
    window.addEventListener('resize', () => {
      getClientWidth();
    });
    // 销毁
    return window.removeEventListener('resize', () => {
      getClientWidth();
    });
  }, [isMobile]);
  const Sider = () => {
    return isMobile ? (
      <DrawerLayoutSider routeMenuList={initAsyncRouterList(asyncRoute)} />
    ) : (
      <LayoutSider routeMenuList={initAsyncRouterList(asyncRoute)} />
    );
  };
  return <Sider />;
};

export default Sider;

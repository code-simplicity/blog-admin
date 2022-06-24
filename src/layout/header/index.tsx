/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:26
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 23:34:32
 * @FilePath: \react-blog-admin\src\layout\header\index.tsx
 * @Description:头部
 */
import React, { useState } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
const { Header } = Layout;
import style from './index.module.less';
import UserDropdown from './components/user-dropdown';
import HeaderBreadcrumb from './components/Breadcrumb';
import TagViews from '../tabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCollapsed,
  setMenuDrawerVisible,
  setMenuSiderCollapsed,
} from '/@/store/modules/appSlice';

const LayoutHeader: React.FC = () => {
  // 通过useSelector拿到对应的value
  const { collapsed, isMobile, menuSiderCollapsed, menuDrawerVisible } = useSelector(
    (store: any) => store.app,
  );
  // react-redux的对应hooks,触发对应的方法
  const dispatch = useDispatch();

  const handleCollapsed = () => {
    // 通过该函数控制侧栏菜单或者侧栏弹出菜单的显示与隐藏
    // 触发对应的方法，实现全局状态的一个管理
    dispatch(setCollapsed(!collapsed));
    // 如果是移动设备并且
    if (isMobile) {
      // 如果是移动设配,弹出层可显示
      dispatch(setMenuDrawerVisible(!menuDrawerVisible));
      // 是移动设备,正常菜单就不可以收缩
      dispatch(setMenuSiderCollapsed(false));
    } else {
      // 如果不是移动设备那就可以正常收缩
      dispatch(setMenuSiderCollapsed(!menuSiderCollapsed));
      // 不是移动设备那就关闭弹出层
      dispatch(setMenuDrawerVisible(false));
    }
  };
  return (
    <Header className="mb-10 w-full bg-red-400 flex flex-col" style={{ padding: '0' }}>
      <div className="flex items-center px-2">
        <div className="flex md:w-4/5 min-w-30">
          {/* 收缩图标 */}
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: `{style['trigger']} text-xl mr-2`,
            onClick: handleCollapsed,
          })}
          {/* 面包屑 */}
          <HeaderBreadcrumb />
        </div>
        <div className="flex md:w-1/5 justify-end">
          <UserDropdown />
        </div>
      </div>
      <TagViews />
    </Header>
  );
};
export default LayoutHeader;

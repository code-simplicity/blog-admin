/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:26
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 09:18:18
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

const LayoutHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header className="relative w-full bg-red-400 flex flex-col" style={{ padding: '0' }}>
      <div className="flex items-center px-2">
        <div className="flex md:w-4/5 min-w-30">
          {/* 收缩图标 */}
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: `{style['trigger']} text-xl mr-2`,
            onClick: () => setCollapsed(!collapsed),
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

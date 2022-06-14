/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:26
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 15:19:30
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

const LayoutHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header className={style['site-layout-background']} style={{ padding: 0 }}>
      <div className="md:flex flex items-center px-2">
        <div>
          {/* 收缩图标 */}
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: `{style['trigger']} text-xl mr-2`,
            onClick: () => setCollapsed(!collapsed),
          })}
        </div>
        <div>
          {/* 面包屑 */}
          <HeaderBreadcrumb />
        </div>

        <div className="absolute right-5">
          <UserDropdown />
        </div>
      </div>
    </Header>
  );
};
export default LayoutHeader;
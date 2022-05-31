import React, { useState } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;
import style from './index.module.less';
const LayoutHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header className={style['site-layout-background']} style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: `{style['trigger']}`,
        onClick: () => setCollapsed(!collapsed),
      })}
    </Header>
  );
};
export default LayoutHeader;

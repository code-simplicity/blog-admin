/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:10:30
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 23:35:17
 * @FilePath: \react-blog-admin\src\layout\index.tsx
 * @Description:
 */
import React, { FC, useEffect, useRef } from 'react';
import { Layout } from 'antd';
import Sider from './sider';
import LayoutHeader from './header';
import LayoutContent from './content';
import TagViews from './tabs/index';

const LayoutApp: FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout className="overflow-x-hidden md:h-full">
        <LayoutHeader />
        <LayoutContent />
      </Layout>
    </Layout>
  );
};
export default LayoutApp;

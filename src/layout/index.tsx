/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:10:30
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 22:38:24
 * @FilePath: \react-blog-admin\src\layout\index.tsx
 * @Description:
 */
import React, { FC } from 'react';
import { Layout } from 'antd';
import Sider from './sider';
import LayoutHeader from './header';
import LayoutContent from './content';

const LayoutApp: FC = () => {
  return (
    <Layout>
      <Sider />
      <Layout className="bg-light-50" style={{ marginLeft: '200px' }}>
        <LayoutHeader />
        <Layout>
          <LayoutContent />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default LayoutApp;

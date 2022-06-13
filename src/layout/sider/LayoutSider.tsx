/*
 * @Author: bugdr
 * @Date: 2022-05-31 12:52:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 13:04:45
 * @FilePath: \react-blog-admin\src\layout\sider\LayoutSider.tsx
 * @Description:
 */
import React from 'react';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
const LayoutSider: React.FC = () => {
  return (
    <Sider className="fixed md:h-full left-0 top-0 inset-0 " trigger={null} collapsible>
      <div className="h-8 m-4 text-light-50 text-center bg-red-400">logo</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />
    </Sider>
  );
};

export default LayoutSider;

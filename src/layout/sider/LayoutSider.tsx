import React from 'react';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
const LayoutSider: React.FC = () => {
  return (
    <Sider className="" trigger={null} collapsible>
      <div className="bg-blue-600 h-8 m-4">logo</div>
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

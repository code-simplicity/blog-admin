/*
 * @Author: bugdr
 * @Date: 2022-06-13 13:47:25
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 15:03:02
 * @FilePath: \react-blog-admin\src\layout\header\components\user-dropdown\index.tsx
 * @Description:用户下拉菜单选项
 */
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Image } from 'antd';
import React from 'react';

// 下拉菜单的选项
const menu = (
  <Menu
    items={[
      {
        key: 'doc',
        label: '文档',
        icon: <SmileOutlined />,
      },
      {
        key: 'lock',
        label: '锁屏',
        icon: <SmileOutlined />,
      },
      {
        key: 'logout',
        label: '退出系统',
        icon: <SmileOutlined />,
      },
    ]}
  />
);

const UserDropdown: React.FC = () => {
  return (
    <Dropdown overlay={menu}>
      <Space>
        <span className="md:flex items-center">
          <img
            className="mr-2 rounded-full h-11 w-11"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="头像"
          />
          <span className="text-light-50 text-base">bugdr</span>
        </span>
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

export default UserDropdown;

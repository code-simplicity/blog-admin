/*
 * @Author: bugdr
 * @Date: 2022-06-13 13:47:25
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 08:03:42
 * @FilePath: \react-blog-admin\src\layout\header\components\user-dropdown\index.tsx
 * @Description:用户下拉菜单选项
 */
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Image, Button } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import DropdownItem from './DropdownItem';

const UserDropdown: FC = () => {
  // 获取用户信息
  const { UserInfo, Token } = useSelector((store: any) => store.user);

  return (
    <>
      {Token !== null && UserInfo !== null ? (
        <Dropdown
          overlay={DropdownItem()}
          className="cursor-pointer"
          arrow={{ pointAtCenter: true }}
          placement="bottomLeft"
        >
          <Space>
            <img
              className="mr-2 rounded-full h-11 w-11"
              src={UserInfo.avatar}
              alt={UserInfo.userName}
            />
            <span className="text-light-50 text-base">{UserInfo.userName}</span>
            <DownOutlined />
          </Space>
        </Dropdown>
      ) : (
        <Button>登录</Button>
      )}
    </>
  );
};

export default UserDropdown;

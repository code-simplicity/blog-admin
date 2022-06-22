/*
 * @Author: bugdr
 * @Date: 2022-05-31 12:52:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 22:20:13
 * @FilePath: \react-blog-admin\src\layout\sider\LayoutSider.tsx
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MenuItemType } from './type';
import { ERROR_PAGE, PAGE_NOT_FOUND_NAME } from '/@/router/constant';
const { Sider } = Layout;

const LayoutSider: React.FC = (props: any) => {
  const { routeMenuList } = props;
  // 路由的链接
  const routeList: MenuItemType[] | any = [];
  routeMenuList.map((item: any) => {
    if (item.label !== ERROR_PAGE) {
      routeList.push(item);
    }
  });
  // 初始化默认选中的第一个Item
  const [defaultMenuItemKeys, setDefaultMenuItemKeys] = useState<string[]>(['/dashboard']);
  // 默认选中的第一个子Item
  const [defaultSubItemKeys, setDefaultSubItemKeys] = useState<string[]>(['/dashboard/analysis']);
  useEffect(() => {
    // setDefaultMenuItemKeys();
  }, []);

  const navigate = useNavigate();
  const onSelect = (menuList: any) => {
    const { key } = menuList;
    navigate(key);
  };
  // 结构菜单栏
  return (
    <Sider className="z-100" trigger={null}>
      <div className="h-8 m-4 text-light-50 text-center bg-red-400">logo</div>
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={defaultMenuItemKeys}
        // defaultOpenKeys={defaultSubItemKeys}
        items={routeList}
        onSelect={onSelect}
      ></Menu>
    </Sider>
  );
};

export default LayoutSider;

/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:10:30
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-24 08:55:02
 * @FilePath: \react-blog-admin\src\layout\index.tsx
 * @Description:
 */
import React, { FC } from 'react';
import { Layout } from 'antd';
import Sider from './sider';
import LayoutHeader from './header';
import LayoutContent from './content';
import { asyncRoute } from '/@/router';

import { getItem, MenuItemType } from './sider/type';

const LayoutApp: FC = () => {
  // 对菜单进行循环编译
  const initAsyncRouterList = (routeList: MenuItemType[]) => {
    // 排序
    routeList.sort((a: any, b: any) => {
      return a.meta.orderNo - b.meta.orderNo;
    });
    return routeList.map((route) => {
      return getItem(route);
    });
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider routeMenuList={initAsyncRouterList(asyncRoute)} />
      <Layout className="overflow-x-hidden md:h-full">
        <LayoutHeader routeMenuList={initAsyncRouterList(asyncRoute)} />
        <LayoutContent />
      </Layout>
    </Layout>
  );
};
export default LayoutApp;

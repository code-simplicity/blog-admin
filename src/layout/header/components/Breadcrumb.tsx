/*
 * @Author: bugdr
 * @Date: 2022-06-13 13:46:09
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 15:07:01
 * @FilePath: \react-blog-admin\src\layout\header\components\Breadcrumb.tsx
 * @Description:面包屑
 */
import { Breadcrumb } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

const HeaderBreadcrumb: React.FC = () => {
  // 面包屑这块获取到当前访问的路由，然后将路由的相关文字添加
  // 获取location的能力,变化之后进入路由
  const location = useLocation();
  return (
    <Breadcrumb className="text-base">
      <Breadcrumb.Item>1</Breadcrumb.Item>
      <Breadcrumb.Item>2</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default HeaderBreadcrumb;

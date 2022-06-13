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

const HeaderBreadcrumb: React.FC = () => {
  return (
    <Breadcrumb className="text-base">
      <Breadcrumb.Item>1</Breadcrumb.Item>
      <Breadcrumb.Item>2</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default HeaderBreadcrumb;

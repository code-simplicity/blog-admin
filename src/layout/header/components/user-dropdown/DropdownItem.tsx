/*
 * @Author: bugdr
 * @Date: 2022-06-13 14:08:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 22:21:43
 * @FilePath: \react-blog-admin\src\layout\header\components\user-dropdown\DropdownItem.tsx
 * @Description:下拉菜单的列表
 */
import { Menu } from 'antd';
import React, { FC, useState } from 'react';
interface DropdownItemProps {
  icon: string;
  key: string;
  label: string;
  title: string;
}

const DropdownItem: FC = (props: DropdownItemProps) => {
  return (
    <Menu.Item icon={props.icon} key={props.key} label={props.label}>
      {props.title}
    </Menu.Item>
  );
};
export default DropdownItem;

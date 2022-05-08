/*
 * @Author: bugdr
 * @Date: 2022-05-06 18:09:36
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-08 09:04:19
 * @FilePath: \blog-admin\src\views\user\userList\tableColumn.tsx
 * @Description:表格的列
 */

import { TableColumnType } from 'ant-design-vue';

// 用户列表表头
export function getUserColumns(): TableColumnType<DataType>[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      width: 140,
      key: 'userName',
      align: 'center',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      width: 140,
      key: 'roles',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 120,
      key: 'avatar',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
      key: 'email',
      align: 'center',
    },
    {
      title: '签名',
      dataIndex: 'sign',
      width: 200,
      ellipsis: true,
      key: 'sign',
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      key: 'state',
      align: 'center',
    },
    {
      title: '注册IP',
      dataIndex: 'regIp',
      width: 160,
      ellipsis: true,
      key: 'regIp',
    },
    {
      title: '登录IP',
      dataIndex: 'loginIp',
      width: 160,
      ellipsis: true,
      key: 'loginIp',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 120,
      sorter: true,
      ellipsis: true,
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 120,
      sorter: true,
      ellipsis: true,
      key: 'updateTime',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 250,
      key: 'action',
    },
  ];
}

/**
 * 表格数据类型
 */
export interface DataType {
  id: string | number;
  userName: string | number;
  roles: string | number;
  avatar: string | number;
  email: string | number;
  sign: string | number;
  state: string | number;
  regIp: string | number;
  loginIp: string | number;
  createTime: string | number;
  updateTime: string | number;
}

// 重置密码弹窗的表单接口类型
export interface resetPasswordModal {
  userId: string | number;
  password: string | number;
}

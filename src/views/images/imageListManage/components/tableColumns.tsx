/*
 * @Author: bugdr
 * @Date: 2022-05-21 14:20:38
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-21 14:33:12
 * @FilePath: \blog-admin\src\views\images\imageListManage\components\tableColumns.tsx
 * @Description:表格的columns
 */

import { TableColumnType } from 'ant-design-vue';

export function getTableColumn(): TableColumnType<DateType>[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '100px',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '拥有者',
      dataIndex: 'userId',
      key: 'userId',
      width: '100px',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '图片',
      dataIndex: 'url',
      key: 'url',
      width: '150px',
      align: 'center',
    },
    {
      title: '图片分类',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: '100px',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '存储地址',
      dataIndex: 'path',
      key: 'path',
      width: '140px',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '图片类型',
      dataIndex: 'contentType',
      key: 'contentType',
      width: '100px',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '图片名称',
      dataIndex: 'name',
      key: 'name',
      width: '100px',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      width: '100px',
      ellipsis: true,
      align: 'center',
      sorter: true,
    },
    {
      title: '来源',
      dataIndex: 'original',
      key: 'original',
      width: '100px',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '120px',
      ellipsis: true,
      sorter: true,
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: '120px',
      ellipsis: true,
      sorter: true,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: '250px',
    },
  ];
}

export interface DateType {
  id: string | number;
  userId: string | number;
  categoryId: string | number;
  url: string;
  path: string;
  contentType: string;
  name: string;
  state: string | number;
  original: string;
  createTime: string | number;
  updateTime: string | number;
}

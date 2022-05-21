/*
 * @Author: bugdr
 * @Date: 2022-05-19 17:01:20
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-21 12:54:36
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\tableColumns.tsx
 * @Description:表格的columns
 */

import { TableColumnType } from 'ant-design-vue';

export function getTableColumn(): TableColumnType<DateType>[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 180,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '拥有者',
      dataIndex: 'userId',
      key: 'userId',
      width: 180,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 180,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      sorter: true,
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 160,
      sorter: true,
      ellipsis: true,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 220,
      key: 'action',
    },
  ];
}

export interface DateType {
  id: string | number;
  userId: string | number;
  categoryName: string | number;
  createTime: string | number;
  updateTime: string | number;
}

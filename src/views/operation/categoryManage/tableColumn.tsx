/*
 * @Author: bugdr
 * @Date: 2022-05-09 13:08:53
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-09 13:53:24
 * @FilePath: \blog-admin\src\views\operation\categoryManage\tableColumn.tsx
 * @Description:表格的column
 */
import { TableColumnType } from 'ant-design-vue';

export function getTableColumn(): TableColumnType<DateType>[] {
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
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '拼音',
      dataIndex: 'pinyin',
      key: 'pinyin',
      width: 120,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '顺序',
      dataIndex: 'order',
      key: 'order',
      width: 100,
      ellipsis: true,
      align: 'center',
      sorter: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
      sorter: true,
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 120,
      sorter: true,
      ellipsis: true,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 250,
      key: 'action',
    },
  ];
}

export interface DateType {
  id: string | number;
  name: string | number;
  pinyin: string | number;
  description: string | number;
  order: string | number;
  state: string | number;
  createTime: string | number;
  updateTime: string | number;
}

/*
 * @Author: bugdr
 * @Date: 2022-05-18 08:22:51
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-18 08:46:29
 * @FilePath: \blog-admin\src\views\operation\looperManage\tableColumn.tsx
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
      title: '图片标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '图片地址',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 140,
      align: 'center',
    },
    {
      title: '跳转链接',
      dataIndex: 'targetUrl',
      key: 'targetUrl',
      width: 120,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
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
  title?: string;
  order: string | number;
  state: string | number;
  targetUrl?: string;
  imageUrl?: string;
  createTime: string | number;
  updateTime: string | number;
}

/*
 * @Author: bugdr
 * @Date: 2022-05-08 16:14:26
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-08 20:44:05
 * @FilePath: \blog-admin\src\views\content\articleManage\tableColumn.tsx
 * @Description:表格的column
 */
import { TableColumnType } from 'ant-design-vue';

/**
 *表格的列
 * @returns
 */
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '发布者ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 200,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '背景',
      dataIndex: 'cover',
      key: 'cover',
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
      sorter: true,
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
      width: 250,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 120,
      ellipsis: true,
      align: 'center',
      sorter: true,
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
  title: string | number;
  userId: string | number;
  type: string | number;
  state: string | number;
  summary: string | number;
  label: string | number;
  viewCount: string | number;
  cover: string | number;
  createTime: string | number;
  updateTime: string | number;
}

/**
 * 文章状态
 */
export const ArticleState = [
  {
    key: '0',
    value: '已删除',
    color: '#F70000',
  },
  {
    key: '1',
    value: '已发布',
    color: '#108ee9',
  },
  {
    key: '2',
    value: '草稿',
    color: '#87d068',
  },
  {
    key: '3',
    value: '置顶',
    color: '#e208ff',
  },
];

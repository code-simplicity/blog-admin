<!--
 * @Author: bugdr
 * @Date: 2022-05-06 10:33:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-07 10:39:13
 * @FilePath: \blog-admin\src\views\user\userlist\index.vue
 * @Description: 用户管理
-->
<template>
  <PageWrapper title="用户列表">
    <template #headerContent>
      <UserListHeader />
    </template>
    <div class="md:flex bg-white mb-4 p-5">
      <div class="md:w-7/10 w-full enter-y"> <UserListHeaderForm /></div>
      <div class="md:w-3/10 w-full enter-y">
        <UserListHeaderSetting />
      </div>
    </div>
    <div class="lg:flex bg-white">
      <Table
        :row-selection="userRowSelection"
        :data-source="userDataSource"
        :columns="userColumns"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        :scroll="{ x: 1400, y: 1000 }"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <Image :src="record.avatar" />
          </template>
          <template v-if="column.key === 'roles'">
            <Tag v-if="record.roles === 'role_admin'" color="#108ee9">管理员</Tag>
            <Tag v-else color="#87d068">用户</Tag>
          </template>
          <template v-if="column.key === 'state'">
            <Tag v-if="record.state === '1'" color="#108ee9">存在</Tag>
            <Tag v-else color="#87d068">已删除</Tag>
          </template>
          <template v-if="column.key === 'createTime'">
            <span>{{ tableFormDate(record.createTime) }}</span>
          </template>
          <template v-if="column.key === 'updateTime'">
            <span>{{ tableFormDate(record.updateTime) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <Popconfirm
              title="确定删除"
              ok-text="删除"
              cancel-text="取消"
              @confirm="handleAction('delete', record)"
              @cancel="cancel"
            >
              <Button danger class="mx-2.5" size="small">删除</Button>
            </Popconfirm>

            <Button type="primary" size="small" @click="handleAction('resetPassword', record)"
              >重置密码</Button
            >
          </template>
        </template>
      </Table>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { PageWrapper } from '../../../components/Page';
  import UserListHeader from './components/UserListHeader.vue';
  import UserListHeaderSetting from './components/UserListHeaderSetting.vue';
  import UserListHeaderForm from './components/UserListHeaderForm.vue';
  import {
    Table,
    message as Message,
    Image,
    TableProps,
    Tag,
    Button,
    Popconfirm,
  } from 'ant-design-vue';
  // 日期格式化
  import { formatToDateTime } from '/@/utils/dateUtil';
  // 获取用户列表
  import { getUserList } from '../../../api/user/user';
  import { getUserColumns } from './tableColumn';
  import { ResponseCode } from '../../../utils';
  // 获取表头
  const userColumns = getUserColumns();
  // 表格加载状态
  const loading = ref<boolean>(false);
  // 查询参数
  const userTableParams = reactive({
    page: 1,
    size: 10,
    email: '',
    userName: '',
  });

  // 分页
  const pagination = reactive({
    current: 1, // 当前页数
    total: 10, // 数据总数
    pageSize: 10, //每页中显示10条数据
    showSizeChanger: true, // 是否可以改变 pageSize
    showQuickJumper: true, // 是否可以快速跳转至某页
    pageSizeOptions: ['10', '20', '50', '100'], //每页中显示的数据
    showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
  });

  // 表格数据
  const userDataSource = ref();
  // 获取表格数据
  async function findGetUserInfo() {
    loading.value = true;
    const result = await getUserList({ ...userTableParams });
    if (result.code === ResponseCode.SUCCESS) {
      loading.value = false;
      userDataSource.value = result.result.content;
      // 后端分页参数
      pagination.current = result.result.number + 1;
      pagination.pageSize = result.result.size;
      pagination.total = result.result.totalElements;
    } else {
      loading.value = false;
      Message.error(result.message);
    }
  }
  findGetUserInfo();

  // 改变表格change的回调
  async function handleTableChange(pagination) {
    pagination.current = pagination.current;
    pagination.pageSize = pagination.pageSize;
    userTableParams.page = pagination.current;
    userTableParams.size = pagination.pageSize;
    // 调用获取表格数据
    findGetUserInfo();
  }

  // 时间格式化
  function tableFormDate(value) {
    return formatToDateTime(value);
  }

  // 选择数据
  const userRowSelection: TableProps['rowSelection'] = {
    // onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
  };

  // 控制按钮
  const handleAction = (key, value) => {
    switch (key) {
      case 'delete':
        onDeleteUser(value);
        break;
      case 'resetPassword':
        onResetPassword(value);
        break;
    }
  };

  // 打开气泡弹窗 删除
  const onDeleteUser = async (value) => {
    console.log('value :>> ', value);
  };
  // 取消
  const cancel = () => {};

  // 重置密码 TODO:
  async function onResetPassword(value) {}
</script>
<style lang="less" scoped>
  .ant-table-striped :deep(.table-striped) td {
    background: #fafafa;
  }
</style>

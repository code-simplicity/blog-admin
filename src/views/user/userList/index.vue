<!--
 * @Author: bugdr
 * @Date: 2022-05-06 10:33:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-06 20:59:27
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
        :scroll="{ x: 1300, y: 1000 }"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <Image :src="record.avatar" />
          </template>
        </template>
      </Table>
      <Pagination
        v-model:current="current1"
        show-quick-jumper
        :hideOnSinglePage="true"
        :total="50"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '../../../components/Page';
  import UserListHeader from './components/UserListHeader.vue';
  import UserListHeaderSetting from './components/UserListHeaderSetting.vue';
  import UserListHeaderForm from './components/UserListHeaderForm.vue';
  // import { BasicTable } from '../../../components/Table/index';
  import { Table, message as Message, Image, TableProps, Pagination } from 'ant-design-vue';
  // 获取用户列表
  import { getUserList } from '../../../api/user/user';
  import { DataType, getUserColumns } from './tableColumn';
  import { ResponseCode } from '../../../utils';

  // 获取表头
  const userColumns = getUserColumns();
  const loading = ref<boolean>(false);
  // 表格数据
  const userDataSource = ref();
  // 获取表格数据
  async function findGetUserInfo() {
    const params = {
      page: 1,
      size: 10,
      email: '',
      userName: '',
    };
    const result = await getUserList(params);
    if (result.code === ResponseCode.SUCCESS) {
      userDataSource.value = result.result.content;
    } else {
      Message.error(result.message);
    }
  }
  findGetUserInfo();

  // 分页
  const current1 = ref<number>(2);

  // 选择数据
  const userRowSelection: TableProps['rowSelection'] = {
    // onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
  };
</script>
<style lang="less" scoped></style>

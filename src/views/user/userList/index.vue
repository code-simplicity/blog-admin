<!--
 * @Author: bugdr
 * @Date: 2022-05-06 10:33:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-22 18:32:23
 * @FilePath: \blog-admin\src\views\user\userList\index.vue
 * @Description: 用户管理
-->
<template>
  <PageWrapper title="用户列表">
    <template #headerContent>
      <UserListHeader />
    </template>
    <div class="md:flex bg-white mb-4 p-2 items-center">
      <div class="w-full enter-y">
        <UserListHeaderForm @handleSearchUser="handleSearchUser" @handleResetUser="handleResetUser"
      /></div>
      <!-- <div class="md:w-3/10 w-full enter-y">
        <UserListHeaderSetting />
      </div> -->
    </div>
    <div class="lg:flex bg-white p-2">
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
            <Tag v-else color="#F70000">已删除</Tag>
          </template>
          <template v-if="column.key === 'createTime'">
            <span>{{ tableFormDate(record.createTime) }}</span>
          </template>
          <template v-if="column.key === 'updateTime'">
            <span>{{ tableFormDate(record.updateTime) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <Popconfirm
              :title="popConfirmTitle"
              ok-text="删除"
              cancel-text="取消"
              @confirm="onDeleteUser(record)"
            >
              <Button type="primary" danger class="mx-2.5" size="small">删除</Button>
            </Popconfirm>

            <Button type="primary" size="small" @click="onResetPassword(record)">重置密码</Button>
          </template>
        </template>
      </Table>
    </div>
    <UserListModal ref="resetPasswordRef" :userModal="userModal" @handleConfirm="handleConfirm">
      <Form :label-col="{ span: 2 }" :model="resetPasswordForm">
        <FormItem name="userId" class="enter-x" label="ID">
          <Input size="large" v-model:value="resetPasswordForm.userId" disabled />
        </FormItem>
        <FormItem name="password" class="enter-x" label="密码">
          <InputPassword
            size="large"
            v-model:value="resetPasswordForm.password"
            :placeholder="t('sys.login.passwordPlaceholder')"
          />
        </FormItem>
      </Form>
    </UserListModal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { PageWrapper } from '../../../components/Page';
  import UserListHeader from './components/UserListHeader.vue';
  // import UserListHeaderSetting from './components/UserListHeaderSetting.vue';
  import UserListHeaderForm from './components/UserListHeaderForm.vue';
  import {
    Table,
    message as Message,
    Image,
    TableProps,
    Tag,
    Button,
    Popconfirm,
    Form,
    FormItem,
    Input,
    InputPassword,
  } from 'ant-design-vue';
  // 日期格式化
  import { formatToDateTime } from '/@/utils/dateUtil';
  // 获取用户列表
  import { deleteUser, getUserList, resetPassword } from '../../../api/user/user';
  import { getUserColumns, resetPasswordModal } from './tableColumn';
  import { ResponseCode } from '../../../utils';
  import UserListModal from './components/UserListModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  // 获取表头
  const userColumns = getUserColumns();
  // 表格加载状态
  const loading = ref<boolean>(false);

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
  const initUserInfoTable = async (userParams) => {
    loading.value = true;
    const params = {
      page: userParams.current,
      size: userParams.pageSize,
      email: userParams.email ? userParams.email : null,
      userName: userParams.userName ? userParams.userName : null,
    };
    const result = await getUserList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents, pageSize, currentPage, totalCount } = result.result;
      loading.value = false;
      userDataSource.value = contents;
      // 后端分页参数
      pagination.current = currentPage;
      pagination.pageSize = pageSize;
      pagination.total = totalCount;
      Message.success(result.message);
    } else {
      loading.value = false;
      Message.error(result.message);
    }
  };
  initUserInfoTable(pagination);

  // 改变表格change的回调
  const handleTableChange = async (page) => {
    // 调用获取表格数据
    await initUserInfoTable(page);
  };

  // 时间格式化
  const tableFormDate = (value) => {
    return formatToDateTime(value);
  };

  // 选择数据
  const userRowSelection: TableProps['rowSelection'] = {};

  let popConfirmTitle = ref<string>('确认删除');

  // 打开气泡弹窗 删除,这是逻辑删除，改变状态而已
  const onDeleteUser = async (value) => {
    const result = await deleteUser(value.id);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
    } else {
      Message.error(result.message);
    }
  };

  // 弹窗
  const userModal = reactive({
    title: '重置密码',
    isShowModal: false,
    cancelText: '取消',
    okText: '重置',
  });
  const resetPasswordRef = ref(null);
  const resetPasswordForm = reactive<resetPasswordModal>({
    userId: '',
    password: '',
  });
  // 重置密码
  const onResetPassword = async (value) => {
    userModal.isShowModal = true;
    resetPasswordForm.userId = value.id;
  };
  // 提交重置密码
  const handleConfirm = async () => {
    if (!resetPasswordForm.password) {
      return Message.warning('密码不可以为空');
    }
    const result = await resetPassword(resetPasswordForm);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
      // 关闭弹窗
      resetPasswordRef.value.handleCancel();
    } else {
      Message.error(result.message);
    }
  };

  // 搜索
  const handleSearchUser = async (form) => {
    // 拼接数据
    const params = {
      page: pagination.current,
      size: pagination.pageSize,
      ...form,
    };
    await initUserInfoTable(params);
  };
  // 重置
  const handleResetUser = async () => {
    // 传递页码
    const params = {
      page: pagination.current,
      size: pagination.pageSize,
    };
    await initUserInfoTable(params);
  };
</script>
<style lang="less" scoped>
  .ant-table-striped :deep(.table-striped) td {
    background: #fafafa;
  }
</style>

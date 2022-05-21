<!--
 * @Author: bugdr
 * @Date: 2022-05-21 13:59:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-21 14:34:44
 * @FilePath: \blog-admin\src\views\images\imageListManage\components\leftCard.vue
 * @Description:左侧卡片
-->
<template>
  <div>
    <Card title="用户列表" :loading="cardLoading" :bordered="false">
      <template #title>
        <span>用户列表</span>
        <span>
          <Input />
        </span>
      </template>
      <div class="overflow-auto h-96 max-h-full md:max-h-screen">
        <Tree :tree-data="userTreeData" :field-names="fieldNames" :showIcon="true">
          <template #title="{ userName }">
            <span>{{ userName }}</span>
          </template>
          <template #icon="{ imageCategories }">
            <template v-if="imageCategories">
              <UserOutlined />
            </template>
            <template v-else>
              <ContactsOutlined />
            </template>
          </template>
        </Tree>
      </div>
      <div class="md:flex items-center mt-4">
        <!-- 分页 -->
        <Pagination
          v-model:current="pagination.current"
          v-model:pageSize="pagination.pageSize"
          :total="pagination.total"
          :showTotal="pagination.showTotal"
          size="small"
          @change="pageChange"
        />
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { Card, Tree, Input, message as Message, Image, Pagination } from 'ant-design-vue';
  import { ResponseCode, transferKeyTree } from '../../../../utils';
  import { getUserListImageCategory } from '../../../../api/user/user';
  import { UserOutlined, ContactsOutlined } from '@ant-design/icons-vue';
  // 卡片加载
  const cardLoading = ref<boolean>(false);
  // 用户表的数据树状结构
  const userTreeData = ref();
  // 自定义字段
  const fieldNames = {
    title: 'userName',
    key: 'id',
    children: 'imageCategories',
  };
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total) => `用户${total}人`,
  });
  const initUserListCategoryTree = async (data) => {
    cardLoading.value = true;
    const params = {
      page: data.current,
      size: data.pageSize,
      email: data.email,
      userName: data.userName,
    };
    const result = await getUserListImageCategory(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents, pageSize, currentPage, totalCount } = result.result;
      const params = {
        node: contents,
        newKey: 'userName',
        oldKey: 'categoryName',
        children: 'imageCategories',
      };
      userTreeData.value = transferKeyTree(params);
      pagination.current = currentPage;
      pagination.pageSize = pageSize;
      pagination.total = totalCount;
      cardLoading.value = false;
    } else {
      Message.error(result.message);
      cardLoading.value = false;
    }
  };
  initUserListCategoryTree(pagination);
  // 改变页码
  const pageChange = (page: number, pageSize: number) => {
    const params = {
      current: page,
      pageSize: pageSize,
    };
    initUserListCategoryTree(params);
  };
</script>
<style lang="less" scoped></style>

<!--
 * @Author: bugdr
 * @Date: 2022-05-19 21:24:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-20 20:32:43
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\components\leftTree.vue
 * @Description:左侧栏
-->
<template>
  <Card title="用户列表" :loading="loading" :bordered="false">
    <Tree
      :tree-data="userTreeData"
      :field-names="fieldNames"
      :showIcon="true"
      @select="selectUserTree"
    >
      <template #title="{ userName }">
        <span
          :class="userName ? 'text-blue-700' : ''"
          class="text-gray-900 ml-2 md:text-lg md:text-base"
        >
          {{ userName }}
        </span>
      </template>
      <template #icon="{ avatar }">
        <UserOutlined v-if="!avatar" />
        <Image
          v-else
          class="rounded-full h-12 w-12 flex items-center justify-center"
          :src="avatar"
        />
      </template>
    </Tree>
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
</template>
<script setup lang="ts">
  import { ref, inject, reactive } from 'vue';
  import { Tree, Pagination, message as Message, Image, Card } from 'ant-design-vue';
  import { UserOutlined } from '@ant-design/icons-vue';
  import { getUserList } from '../../../../api/user/user';
  import { ResponseCode } from '../../../../utils';
  import type { TreeProps } from 'ant-design-vue';
  import { treeFirstNode } from './model/Tree';

  // 依赖收集
  const userIdActive = inject('userIdActive');
  // loading加载
  const loading = ref<boolean>(false);
  // 分页
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total) => `用户${total}人`,
  });
  // 表格参数
  const pageTreeParams = reactive({
    page: 1,
    size: 10,
  });
  // 树状的结构
  const userTreeData = ref([]);
  // 自定义树的字段
  const fieldNames: TreeProps['fieldNames'] = {
    title: 'userName',
    key: 'id',
    icon: 'avatar',
  };
  // 获取用户列表
  const initUserList = async (params) => {
    loading.value = true;
    const result = await getUserList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents, pageSize, currentPage, totalCount } = result.result;
      // 添加一个全部的节点
      userTreeData.value = contents;
      userTreeData.value.unshift(treeFirstNode());
      // 默认选中第一个
      // 后端分页参数
      pagination.current = currentPage;
      pagination.pageSize = pageSize;
      pagination.total = totalCount;
      loading.value = false;
    } else {
      loading.value = false;
      Message.error(result.message);
    }
  };
  initUserList(pageTreeParams);
  // 改变页面
  const pageChange = async (page: number, pageSize: number) => {
    const params = {
      page: page,
      size: pageSize,
    };
    await initUserList(params);
  };
  // 选择树节点
  const selectUserTree = async (selectedKeys) => {
    // 依赖收集传递出去
    userIdActive.value = selectedKeys[0];
  };
</script>
<style lang="less" scoped>
  :deep(.ant-tree-switcher) {
    width: 0;
  }
</style>

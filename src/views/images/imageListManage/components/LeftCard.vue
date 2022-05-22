<!--
 * @Author: bugdr
 * @Date: 2022-05-21 13:59:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-22 17:24:18
 * @FilePath: \blog-admin\src\views\images\imageListManage\components\leftCard.vue
 * @Description:左侧卡片
-->
<template>
  <div>
    <Card :loading="cardLoading" :bordered="false">
      <template #title>
        <!-- <span class="text-xs mr-2">用户列表</span> -->
      </template>
      <template #extra>
        <InputSearch
          v-model:value="searchUserName"
          :placeholder="t('sys.image.userUserNamePlaceholder')"
          enter-button
          allowClear
          style="w-24 min-w-full md:min-w-0"
          @search="onSearchUserList"
        />
      </template>
      <div class="overflow-auto h-96 max-h-full md:max-h-screen">
        <Tree
          v-model:selectedKeys="selectedKeys"
          :tree-data="userTreeData"
          :field-names="fieldNames"
          :showIcon="true"
          @select="selectHandle"
        >
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
  import { ref, reactive, inject } from 'vue';
  import { Card, Tree, message as Message, Pagination, InputSearch } from 'ant-design-vue';
  import { ResponseCode, transferKeyTree } from '../../../../utils';
  import { getUserListImageCategory } from '../../../../api/user/user';
  import { UserOutlined, ContactsOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '../../../../hooks/web/useI18n';

  const { t } = useI18n();
  // 依赖收集用户id
  const activeValue = inject('activeValue');
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
  // 树节点被选中
  const selectedKeys = ref<string[]>([]);
  // tree树节点触发
  const selectHandle = (selectKey, el) => {
    // 做判断看点击的是一级菜单还是二级菜单
    console.log('el', el);
    if (Array.isArray(el.node.imageCategories)) {
      // 那就是选中的一级标题，传userId
      activeValue.userId = el.node.dataRef.id;
      activeValue.categoryId = null;
    } else {
      activeValue.categoryId = el.node.dataRef.id;
    }
  };
  // 搜索用户
  const searchUserName = ref<string>();
  const onSearchUserList = (value) => {
    // 触发搜索
    const params = {
      ...pagination,
      userName: value,
    };
    initUserListCategoryTree(params);
  };
</script>
<style lang="less" scoped></style>

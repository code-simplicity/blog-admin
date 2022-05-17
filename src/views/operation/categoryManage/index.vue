<!--
 * @Author: bugdr
 * @Date: 2022-05-09 12:22:10
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-17 16:08:14
 * @FilePath: \blog-admin\src\views\operation\categoryManage\index.vue
 * @Description: 文章分类管理
-->
<template>
  <div class="p-4">
    <div class="md:flex bg-white mb-4 p-2 items-center">
      <div>
        <Button type="primary" @click="addCategory">添加分类</Button>
      </div>
    </div>
    <div class="md:flex bg-white p-2">
      <Table
        :data-source="categoryDataSource"
        :columns="categoryColumns"
        :scroll="{ x: 1400 }"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag v-if="record.status === '0'" color="#F70000">已删除</Tag>
            <Tag v-if="record.status === '1'" color="#108ee9">存在</Tag>
          </template>
          <template v-if="column.key === 'order'">
            <Tag color="#436C6C">{{ record.order }}</Tag>
          </template>
          <template v-if="column.key === 'createTime'">
            <span>{{ tableFormDate(record.createTime) }}</span>
          </template>
          <template v-if="column.key === 'updateTime'">
            <span>{{ tableFormDate(record.updateTime) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <Button type="primary" class="mr-4" @click="handleAction('edit', record)" size="small"
              >编辑</Button
            >
            <Button
              type="primary"
              danger
              v-if="record.status === '0'"
              @click="handleAction('deleted', record)"
              size="small"
              >已删除</Button
            >
            <Button
              type="primary"
              danger
              v-if="record.status === '1'"
              @click="handleAction('delete', record)"
              size="small"
              >删除</Button
            >
          </template>
        </template>
      </Table>
      <CategoryModalForm
        ref="categoryModelFormRef"
        :categoryModal="categoryModal"
        @initCategoryTable="initCategoryTable"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, unref } from 'vue';
  import { Table, message as Message, Tag, Button } from 'ant-design-vue';
  import { getTableColumn } from './tableColumn';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { getCategoryList } from '/@/api/operation/category';
  import { ResponseCode } from '/@/utils';
  import CategoryModalForm from './components/CategoryModalForm.vue';

  // 时间格式化
  const tableFormDate = (value) => {
    return formatToDateTime(value);
  };
  const categoryDataSource = ref();
  const categoryColumns = getTableColumn();
  const loading = ref<boolean>(false);
  // 表格初始
  const initCategoryList = async () => {
    loading.value = true;
    const result = await getCategoryList();
    if (result.code === ResponseCode.SUCCESS) {
      categoryDataSource.value = result.result;
      Message.success(result.message);
      loading.value = false;
    } else {
      Message.error(result.message);
      loading.value = false;
    }
  };
  initCategoryList();
  // 弹窗刷新表格
  const initCategoryTable = async () => {
    await initCategoryList();
  };
  // 分页
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `共有${total}条数据`,
  });
  // 控制table分页切换
  const handleTableChange = () => {};
  let categoryModal = reactive({
    categoryFormTitle: '添加文章分类',
    cancelCategoryText: '取消',
    okCategoryText: '添加',
    isShowCategoryModal: false,
    categoryModel: null,
  });
  // 添加分类
  const addCategory = () => {
    categoryModal.isShowCategoryModal = true;
  };
  // 控制按钮做出操作
  const handleAction = async (key, value) => {
    switch (key) {
      case 'edit':
        await onEditCateGory(value);
      case 'deleted':
        await onDeletedCategory(value);
      case 'delete':
        await onDeleteCategory(value);
    }
  };
  const categoryModelFormRef = ref();
  // 编辑，打开弹窗
  const onEditCateGory = async (value) => {
    if (!value) return;
    // 打开modal,赋值
    categoryModal.isShowCategoryModal = true;
    categoryModal.categoryFormTitle = '修改文章分类';
    categoryModal.cancelCategoryText = '取消';
    categoryModal.okCategoryText = '修改';
    categoryModal.categoryModel = JSON.parse(JSON.stringify(value));
    const categoryModel = unref(categoryModelFormRef);
    categoryModel.initModalForm();
  };
  // 删除
  const onDeletedCategory = async (value) => {};
  const onDeleteCategory = async (value) => {};
</script>
<style lang="less" scoped></style>

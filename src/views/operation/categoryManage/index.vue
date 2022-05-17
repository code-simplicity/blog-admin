<!--
 * @Author: bugdr
 * @Date: 2022-05-09 12:22:10
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-09 14:02:41
 * @FilePath: \blog-admin\src\views\operation\categoryManage\index.vue
 * @Description: 文章分类管理
-->
<template>
  <div class="p-4">
    <div class="md:flex bg-white mb-4 p-2 items-center"> 头部 </div>
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
            <Button type="primary" class="mr-4">编辑</Button>
            <Button type="primary" danger v-if="record.status === '0'">删除</Button>
            <Button type="primary" danger v-if="record.status === '1'">已删除</Button>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { Table, message as Message, Tag, Button } from 'ant-design-vue';
  import { getTableColumn } from './tableColumn';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { getCategoryList } from '/@/api/operation/category';
  import { ResponseCode } from '/@/utils';

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
  // TODO:接下来是文章分类管理的相关功能编写
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
</script>
<style lang="less" scoped></style>

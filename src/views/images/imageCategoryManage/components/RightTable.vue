<!--
 * @Author: bugdr
 * @Date: 2022-05-19 21:25:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 22:12:48
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\components\rightTable.vue
 * @Description:右侧栏
-->
<template>
  <div class="md:flex flex-col">
    <div class="bg-white">
      <headerForm />
    </div>
    <div class="mt-2 bg-white md:flex p-2">
      <Table
        :data-source="imageCategoryDataSource"
        :columns="imageCategoryTableColumns"
        :loading="tableLoading"
        :pagination="pagination"
        @change="handleTableChange"
        :scroll="{ x: 1000 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'createTime'">
            <span>{{ tableFormDate(record.createTime) }}</span>
          </template>
          <template v-if="column.key === 'updateTime'">
            <span>{{ tableFormDate(record.updateTime) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <Button type="primary" class="mr-4">编辑</Button>
            <Button type="primary" danger>删除</Button>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import headerForm from './HeaderForm.vue';
  import { Table, message as Message, Button } from 'ant-design-vue';
  import { getTableColumn } from '../tableColumns';
  import { getImageCategoryList } from '../../../../api/images/imageCategory';
  import { formatToDateTime } from '../../../../utils/dateUtil';
  import { ResponseCode } from '../../../../utils';

  // 时间格式化
  const tableFormDate = (value) => {
    return formatToDateTime(value);
  };
  const imageCategoryTableColumns = ref(getTableColumn());

  // 表格的数据
  const imageCategoryDataSource = ref();
  // 表格分页器
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `共有${total}条数据`,
  });
  // 表格参数
  const imageCategoryTableParams = reactive({
    page: 1,
    size: 10,
    userId: '',
  });
  // 表格加载状态
  const tableLoading = ref<boolean>(false);
  // 获取图片分类的数据
  const initImageCategoryTable = async (params) => {
    tableLoading.value = true;
    const result = await getImageCategoryList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents, currentPage, pageSize, totalCount } = result.result;
      imageCategoryDataSource.value = contents;
      Message.success(result.message);
      pagination.current = currentPage;
      pagination.pageSize = pageSize;
      pagination.total = totalCount;
      tableLoading.value = false;
    } else {
      Message.error(result.message);
      tableLoading.value = false;
    }
  };
  initImageCategoryTable(imageCategoryTableParams);
  // 控制表格分页
  const handleTableChange = async (page) => {
    const params = {
      page: page.current,
      size: page.pageSize,
    };
    await initImageCategoryTable(params);
  };
</script>
<style lang="less" scoped></style>

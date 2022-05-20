<!--
 * @Author: bugdr
 * @Date: 2022-05-19 21:25:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-20 20:38:01
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\components\rightTable.vue
 * @Description:右侧栏
-->
<template>
  <div class="md:flex flex-col">
    <div class="bg-white">
      <headerForm @handleSearch="handleSearch" />
    </div>
    <div class="mt-4 bg-white md:flex p-2">
      <Table
        :data-source="imageCategoryDataSource"
        :columns="imageCategoryTableColumns"
        :loading="tableLoading"
        :pagination="pagination"
        @change="handleTableChange"
        :scroll="{ x: 1000 }"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'categoryName'">
            <!-- 编辑 -->
            <div>
              <Input
                v-if="editableData[record.id]"
                v-model:value="editableData[record.id][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else> {{ text }} </template>
            </div>
          </template>
          <template v-if="column.key === 'createTime'">
            <span>{{ tableFormDate(record.createTime) }}</span>
          </template>
          <template v-if="column.key === 'updateTime'">
            <span>{{ tableFormDate(record.updateTime) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <span v-if="editableData[record.id]">
              <Button type="primary" class="mr-4" size="small" @click="saveHandle(record.id)"
                >保存</Button
              >
              <Popconfirm title="确定取消修改?" @confirm="cancelHandle(record.id)">
                <Button class="mr-4" size="small">取消</Button>
              </Popconfirm>
            </span>
            <span v-else>
              <Button type="primary" class="mr-4" size="small" @click="editHandle(record.id)"
                >编辑</Button
              >
            </span>
            <Popconfirm title="确定删除?" @confirm="deleteHandle(record.id)">
              <Button type="primary" danger size="small">删除</Button>
            </Popconfirm>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, inject, watch } from 'vue';
  import headerForm from './HeaderForm.vue';
  import { Table, message as Message, Button, Input, Popconfirm } from 'ant-design-vue';
  import { getTableColumn } from '../tableColumns';
  import {
    getImageCategoryList,
    updateImageCategory,
    deleteImageCategory,
  } from '../../../../api/images/imageCategory';
  import { formatToDateTime } from '../../../../utils/dateUtil';
  import { ResponseCode } from '../../../../utils';
  import type { UnwrapRef } from 'vue';
  import { DateType } from '../tableColumns';
  import { cloneDeep } from 'lodash-es';

  // 依赖收集,用户id的收集激活
  const userIdActive = inject('userIdActive');
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
    userId: null,
  });
  // 表格加载状态
  const tableLoading = ref<boolean>(false);
  // 获取图片分类的数据
  const initImageCategoryTable = async (data) => {
    const params = {
      page: data.page,
      size: data.size,
      userId: data.userId,
      categoryName: data.categoryName,
    };
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
  // 观测数据
  watch(userIdActive, (newVal) => {
    const params = {
      page: pagination.current,
      size: pagination.pageSize,
      userId: newVal,
    };
    initImageCategoryTable(params);
  });
  // 控制搜索
  const handleSearch = async (data) => {
    const params = {
      page: pagination.current,
      size: pagination.pageSize,
      userId: userIdActive.value,
      categoryName: data.categoryName,
    };
    await initImageCategoryTable(params);
  };
  // 编辑数据
  const editableData: UnwrapRef<Record<string, DateType>> = reactive({});
  // 编辑实现
  const editHandle = async (key: string) => {
    editableData[key] = cloneDeep(
      imageCategoryDataSource.value.filter((item) => key === item.id)[0],
    );
  };
  // 实现保存
  const saveHandle = async (key: string) => {
    // 拷贝值
    const data = Object.assign(
      imageCategoryDataSource.value.filter((item) => key === item.id)[0],
      editableData[key],
    );
    const params = {
      id: key,
      categoryName: data.categoryName,
    };
    // 触发接口更新
    const result = await updateImageCategory(params);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
      // 触发表格刷新
      const params = {
        page: pagination.current,
        size: pagination.pageSize,
      };
      await initImageCategoryTable(params);
      // 删除
      delete editableData[key];
    } else {
      Message.error(result.message);
    }
  };
  // 取消
  const cancelHandle = (key: string) => {
    // 删除
    delete editableData[key];
  };
  // 删除
  const deleteHandle = async (id: string) => {
    const params = {
      id,
    };
    const result = await deleteImageCategory(params);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
      // 刷新表
      const params = {
        page: pagination.current,
        size: pagination.pageSize,
      };
      await initImageCategoryTable(params);
    } else {
      Message.error(result.message);
    }
  };
</script>
<style lang="less" scoped>
  :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>

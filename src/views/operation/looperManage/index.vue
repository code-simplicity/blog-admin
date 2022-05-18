<!--
 * @Author: bugdr
 * @Date: 2022-05-09 12:21:07
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-18 09:55:16
 * @FilePath: \blog-admin\src\views\operation\looperManage\index.vue
 * @Description: 轮播图管理
-->
<template>
  <div class="p-4">
    <div class="bg-white md:flex mb-4 p-2 items-center">
      <div>
        <Button size="middle" type="primary" @click="addLooper">添加轮播图</Button>
      </div>
    </div>
    <div class="bg-white md:flex p-2">
      <Table
        :data-source="looperDataSource"
        :columns="looperColumns"
        :scroll="{ x: 1400, y: 1000 }"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <a :href="record.targetUrl" target="_blank">
              {{ record.title }}
            </a>
          </template>
          <template v-if="column.key === 'imageUrl'">
            <Image :src="record.imageUrl" :alt="record.title" />
          </template>
          <template v-if="column.key === 'targetUrl'">
            <a :href="record.targetUrl" target="_blank">
              {{ record.targetUrl }}
            </a>
          </template>
          <template v-if="column.key === 'state'">
            <Tag color="#f50" v-if="record.state === '0'">已删除</Tag>
            <Tag color="#108ee9" v-if="record.state === '1'">存在</Tag>
          </template>
          <template v-if="column.key === 'order'">
            <Tag color="blue">{{ record.order }}</Tag>
          </template>
          <template v-if="column.key === 'createTime'">
            <span>{{ tableFormDate(record.createTime) }}</span>
          </template>
          <template v-if="column.key === 'updateTime'">
            <span>{{ tableFormDate(record.updateTime) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <Button type="primary" size="small" @click="editLooperHandle(record)">编辑</Button>
            <Button
              type="primary"
              danger
              class="ml-4"
              size="small"
              @click="deleteLooperHandle(record)"
              >删除</Button
            >
          </template>
        </template>
      </Table>
      <LooperModal :modalValue="modalValue" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { Table, Image, Tag, message as Message, Button } from 'ant-design-vue';
  import { getTableColumn } from './tableColumn';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { ResponseCode } from '/@/utils';
  import { getLooperList } from '/@/api/operation/looper';
  import LooperModal from './components/LooperModal.vue';
  // 轮播图表格columns
  const looperColumns = ref(getTableColumn());
  // 表格的data
  const looperDataSource = ref();
  // 时间格式化
  const tableFormDate = (value) => {
    return formatToDateTime(value);
  };
  // 加载中
  const loading = ref<boolean>(false);
  // 分页
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
  const looperTableParams = reactive({
    page: 1,
    size: 10,
  });
  // 控制分页
  const handleTableChange = async (page) => {
    const params = {
      page: page.current,
      size: page.pageSize,
    };
    await initLooperTable(params);
  };
  // 初始化表格
  const initLooperTable = async (params) => {
    loading.value = true;
    const result = await getLooperList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents, currentPage, pageSize, totalCount } = result.result;
      looperDataSource.value = contents;
      loading.value = false;
      Message.success(result.message);
      // 分页
      pagination.current = currentPage;
      pagination.pageSize = pageSize;
      pagination.total = totalCount;
    } else {
      Message.error(result.message);
      loading.value = false;
    }
  };
  initLooperTable(looperTableParams);
  // 编辑
  const editLooperHandle = async (value) => {};
  // 删除
  const deleteLooperHandle = async (value) => {};
  // 铜川的value值
  const modalValue = reactive({
    visible: false,
    title: '添加轮播图',
    cancelText: '取消',
    okText: '添加',
  });
  // 添加轮播图
  const addLooper = () => {
    modalValue.visible = true;
  };
</script>
<style lang="less" scoped></style>

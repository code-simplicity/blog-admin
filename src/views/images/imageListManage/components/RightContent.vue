<!--
 * @Author: bugdr
 * @Date: 2022-05-21 13:59:46
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-21 15:21:38
 * @FilePath: \blog-admin\src\views\images\imageListManage\components\rightContent.vue
 * @Description:右边内容
-->
<template>
  <div class="">
    <div> <HeaderForm /> </div>
    <div class="bg-white p-2">
      <Table
        :data-source="imageDataSource"
        :columns="imageTableColumns"
        :scroll="{ x: 1400, y: 440 }"
        :loading="tableLoading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'url'">
            <Image :src="record.url" :alt="record.title" />
          </template>
          <template v-if="column.key === 'contentType'">
            <Tag color="#f50" v-if="record.contentType === 'image/png'">
              <span>{{ record.contentType }}</span>
            </Tag>
            <Tag color="#2db7f5" v-if="record.contentType === 'image/jpeg'">
              <span>{{ record.contentType }}</span>
            </Tag>
            <Tag color="#87d068" v-if="record.contentType === 'image/glf'">
              <span>{{ record.contentType }}</span>
            </Tag>
          </template>
          <template v-if="column.key === 'state'">
            <Tag>
              <span>{{ record.state }}</span>
            </Tag>
          </template>
          <template v-if="column.key === 'createTime'">
            <span>{{ tableFormDate(record.createTime) }}</span>
          </template>
          <template v-if="column.key === 'updateTime'">
            <span>{{ tableFormDate(record.updateTime) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <Popconfirm
              v-if="record.state === '1'"
              :title="`确定删除?${record.name}}`"
              @confirm="deleteHandle(record.id)"
            >
              <Button type="primary" danger>删除</Button>
            </Popconfirm>
            <Button v-else type="primary" danger disabled>已删除</Button>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { Table, Image, Button, message as Message, Tag, Popconfirm } from 'ant-design-vue';
  import { getTableColumn, imageContentType } from './tableColumns';
  import HeaderForm from './HeaderForm.vue';
  import { formatToDateTime } from '../../../../utils/dateUtil';
  import { ResponseCode } from '../../../../utils';
  import { getImageList, deleteImage } from '../../../../api/images/imageList';

  // 时间格式化
  const tableFormDate = (value) => {
    return formatToDateTime(value);
  };
  // 图片表格数据
  const imageDataSource = ref();
  // 表格的列
  const imageTableColumns = reactive(getTableColumn());
  // 加载表格
  const tableLoading = ref<boolean>(false);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共有图片${total}张`,
  });
  // 处理分页
  const handleTableChange = async (page) => {
    await initImageTable(page);
  };
  // 获取表格数据
  const initImageTable = async (data) => {
    tableLoading.value = true;
    const params = {
      page: data.current,
      size: data.pageSize,
      original: data.original ? data.original : null,
      userId: data.userId ? data.userId : null,
      categoryId: data.categoryId ? data.categoryId : null,
    };
    const result = await getImageList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents, currentPage, pageSize, totalCount } = result.result;
      imageDataSource.value = contents;
      pagination.current = currentPage;
      pagination.pageSize = pageSize;
      pagination.total = totalCount;
      tableLoading.value = false;
      Message.success(result.message);
    } else {
      tableLoading.value = false;
      Message.error(result.message);
    }
  };
  initImageTable(pagination);
  // 删除
  const deleteHandle = async (imageId: string) => {
    tableLoading.value = true;
    const result = await deleteImage(imageId);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
      // 更新表
      initImageTable(pagination);
    } else {
      Message.error(result.message);
    }
  };
</script>
<style lang="less" scoped></style>

<!--
 * @Author: bugdr
 * @Date: 2022-05-08 15:28:25
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 20:57:59
 * @FilePath: \blog-admin\src\views\content\articleManage\index.vue
 * @Description: 文章管理
-->
<template>
  <PageWrapper title="文章管理">
    <template #headerContent> 文章管理是对发表的文章进行管理 </template>
    <div class="md:flex bg-white mb-4 p-1 items-center">
      <ArticleHeaderForm @handleSearch="handleTableSearch" @handleReset="handleFormReset" />
    </div>
    <div class="md:flex bg-white p-2">
      <Table
        :data-source="articleDataSource"
        :columns="articleColumns"
        :scroll="{ x: 1400, y: 1000 }"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <Button type="link" size="small" href="" target="_blank">{{ record.title }}</Button>
          </template>
          <template v-if="column.key === 'cover'">
            <Image :src="record.cover" :alt="record.title" />
          </template>
          <template v-if="column.key === 'state'">
            <div v-for="(item, index) in articleStateValue" :key="index">
              <Tag :color="item.color" v-if="item.key === record.state">
                <span>{{ item.value }}</span>
              </Tag>
            </div>
          </template>
          <template v-if="column.key === 'viewCount'">
            <Tag color="#436C6C">{{ record.viewCount }}</Tag>
          </template>
          <template v-if="column.key === 'createTime'">
            <span>{{ tableFormDate(record.createTime) }}</span>
          </template>
          <template v-if="column.key === 'updateTime'">
            <span>{{ tableFormDate(record.updateTime) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <Button size="small" type="primary" @click="handleAction('edit', record)">编辑</Button>
            <Popconfirm
              :title="`${popConfirmTitle}-${record.title}`"
              ok-text="删除"
              cancel-text="取消"
              @confirm="handleAction('delete', record)"
            >
              <Button class="mx-2.5" size="small" type="primary" danger>删除</Button>
            </Popconfirm>
            <Button
              type="primary"
              v-if="record.state === '3'"
              size="small"
              @click="handleAction('top', record)"
              >取消置顶</Button
            >
            <Button v-else size="small" type="ghost" @click="handleAction('top', record)"
              >置顶</Button
            >
          </template>
        </template>
      </Table>
    </div>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { PageWrapper } from '../../../components/Page';
  import { Table, Button, message as Message, Image, Tag, Popconfirm } from 'ant-design-vue';
  import { getTableColumn, ArticleState } from './tableColumn';
  import { changeArticleState, getArticleList, topArticle } from '/@/api/content/article';
  import { ResponseCode } from '/@/utils';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import ArticleHeaderForm from './components/ArticleHeaderForm.vue';
  // 时间格式化
  const tableFormDate = (value) => {
    return formatToDateTime(value);
  };
  // 状态值
  const articleStateValue = ref(ArticleState);
  // 表头
  const articleColumns = getTableColumn();
  // 加载表格
  const loading = ref<boolean>(false);
  // 表格数据
  const articleDataSource = ref();
  // 分页配置
  const pagination = reactive({
    current: 1,
    total: 10,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `共有${total}条数据`,
  });
  // 获取文章接口的参数
  const articleTableParams = reactive({
    page: 1,
    size: 10,
    categoryId: '',
    keyword: '',
    state: '',
  });
  // 获取表格数据
  const initArticleList = async (articleParams) => {
    loading.value = true;
    const result = await getArticleList({ ...articleParams });
    if (result.code === ResponseCode.SUCCESS) {
      const { currentPage, pageSize, totalCount, contents } = result.result;
      loading.value = false;
      articleDataSource.value = contents;
      Message.success(result.message);
      // 分页
      pagination.current = currentPage;
      pagination.pageSize = pageSize;
      pagination.total = totalCount;
    } else {
      loading.value = false;
      Message.error(result.message);
    }
  };
  initArticleList(articleTableParams);
  // 控制表格切换
  async function handleTableChange(page) {
    articleTableParams.page = page.current;
    articleTableParams.size = page.pageSize;
    // 调用表格
    const params = {
      page: page.current,
      size: page.pageSize,
    };
    initArticleList(params);
  }
  // 删除提示
  const popConfirmTitle = ref<string>('确定删除');
  // 控制操作
  const handleAction = async (key, value) => {
    switch (key) {
      case 'delete':
        await onDelete(value);
      case 'edit':
        await onEdit(value);
      case 'top':
        await onTop(value);
      default:
        await onEdit(value);
    }
  };
  // 删除文章,逻辑删除
  const onDelete = async (params) => {
    const result = await changeArticleState(params.id);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
      // 刷新表格
      initArticleList(articleTableParams);
    } else {
      Message.error(result.message);
    }
  };
  // 编辑文章
  const onEdit = async (params) => {};
  // 置顶/取消置顶
  const onTop = async (params) => {
    const result = await topArticle(params.id);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
      // 刷新表格
      initArticleList(articleTableParams);
    } else {
      Message.error(result.message);
    }
  };
  // 搜索
  const handleTableSearch = async (form) => {
    const params = {
      page: pagination.current,
      size: pagination.pageSize,
      ...form,
    };
    await initArticleList(params);
  };
  // 重置
  const handleFormReset = async () => {
    await initArticleList(articleTableParams);
  };
</script>
<style lang="less" scoped></style>

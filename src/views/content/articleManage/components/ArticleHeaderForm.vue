<!--
 * @Author: bugdr
 * @Date: 2022-05-08 20:52:19
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-09 10:43:38
 * @FilePath: \blog-admin\src\views\content\articleManage\components\ArticleHeaderForm.vue
 * @Description: 文章列表头部组件
-->
<template>
  <Form
    ref="articleRef"
    :model="articleModel"
    :label-col="{ span: 5 }"
    class="grid grid-cols-1 md:grid-cols-4 items-center"
  >
    <FormItem label="关键字" name="keyword">
      <Input
        v-model:value="articleModel.keyword"
        :placeholder="t('sys.article.keyword')"
        allowClear
      />
    </FormItem>
    <FormItem label="状态" name="state">
      <Select
        v-model:value="articleModel.state"
        :placeholder="t('sys.article.state')"
        :options="articleSelectState"
        allowClear
      />
    </FormItem>
    <FormItem label="分类" name="categoryId">
      <Select
        v-model:value="articleModel.categoryId"
        :placeholder="t('sys.article.categoryId')"
        allowClear
        @select="handleChange"
      >
        <a-select-option v-for="item in categoryListOption" :value="item.name" :key="item.id" />
      </Select>
    </FormItem>
    <div class="mt-3 md:my-2">
      <Button class="mr-4" type="primary" :loading="loadingBtn" @click="handleSearch">
        <template #icon><SearchOutlined /></template>
        搜索</Button
      >
      <Button type="primary" class="mr-4" danger @click="handleReset">
        <template #icon><SyncOutlined /></template>
        重置</Button
      >
      <Button @click="postArticle">
        <template #icon><SendOutlined /></template>
        发布</Button
      >
    </div>
  </Form>
</template>
<script setup lang="ts">
  import { reactive, ref, defineEmits } from 'vue';
  import { Form, FormItem, Input, Select, message as Message, Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ArticleSelectState } from './model/articleForm';
  import { SearchOutlined, SyncOutlined, SendOutlined } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue/es/form/Form';
  import { getCategoryList } from '/@/api/operation/category';
  import { ResponseCode } from '/@/utils';

  const { t } = useI18n();
  const articleModel = reactive({
    keyword: '', // 关键字
    state: undefined, // 状态
    categoryId: undefined,
  });
  const articleSelectState = ref(ArticleSelectState());
  // 文章分类
  const categoryListOption = ref();
  // 获取文章分类
  const categoryList = async () => {
    const result = await getCategoryList();
    if (result.code === ResponseCode.SUCCESS) {
      categoryListOption.value = result.result;
    } else {
      Message.error(result.message);
    }
  };
  categoryList();
  // 传递分类参数给搜索
  const articleCategoryId = ref<string>('');
  // 搜索加载
  const loadingBtn = ref<boolean>(false);
  // emit
  const emit = defineEmits(['handleSearch', 'handleReset']);
  // 表单的ref
  const articleRef = ref<FormInstance>();
  // 搜索
  const handleSearch = () => {
    const params = {
      keyword: articleModel.keyword,
      state: articleModel.state,
      categoryId: articleCategoryId.value,
    };
    emit('handleSearch', params);
  };
  // 重置
  const handleReset = () => {
    // 重置表单值
    if (articleRef.value) articleRef.value.resetFields();
    emit('handleReset');
  };
  // 选中select时候的option值
  const handleChange = (value, option) => {
    articleCategoryId.value = option.key;
  };
  // 发表文章
  const postArticle = () => {};
</script>
<style lang="less" scoped>
  .ant-form-item {
    margin-bottom: 0;
    margin-right: 10px;
  }
</style>

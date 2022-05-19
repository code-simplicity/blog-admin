<!--
 * @Author: bugdr
 * @Date: 2022-05-08 20:52:19
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 22:24:28
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\components\headerForm.vue
 * @Description: 文章列表头部组件
-->
<template>
  <Form
    ref="articleRef"
    :model="articleModel"
    :label-col="{ span: 5 }"
    class="grid grid-rows-1 md:grid-cols-2 items-center"
  >
    <FormItem label="分类名称">
      <Input v-model:value="articleModel.categoryId" allowClear />
    </FormItem>
    <div class="mr-10 mt-3 md:my-2">
      <Button class="mr-4" type="primary" :loading="loadingBtn" @click="handleSearch">
        <template #icon><SearchOutlined /></template>
        搜索</Button
      >
      <Button type="primary" class="mr-4" danger @click="handleReset">
        <template #icon><PlusOutlined /></template>
        添加</Button
      >
    </div>
  </Form>
</template>
<script setup lang="ts">
  import { reactive, ref, defineEmits } from 'vue';
  import { Form, FormItem, Input, message as Message, Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  // import { ArticleSelectState } from './model/articleForm';
  import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue/es/form/Form';
  import { getCategoryList } from '/@/api/operation/category';
  import { ResponseCode } from '/@/utils';

  const { t } = useI18n();
  const articleModel = reactive({
    keyword: '', // 关键字
    state: undefined, // 状态
    categoryId: undefined,
  });
  // 文章分类
  const categoryListOption = ref();
  // 获取文章分类
  const categoryList = async () => {
    const params = {
      page: 1,
      size: 50,
    };
    const result = await getCategoryList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents } = result.result;
      categoryListOption.value = contents;
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

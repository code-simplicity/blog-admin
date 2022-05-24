<!--
 * @Author: bugdr
 * @Date: 2022-05-09 10:58:50
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-24 16:57:46
 * @FilePath: \blog-admin\src\views\article\index.vue
 * @Description: 发布文章
-->
<template>
  <div class="p-4">
    <div class="bg-white md:flex items-center p-1">
      <div class="flex-1">
        <Input
          class="h-12"
          v-model:value="articleModal.title"
          size="large"
          placeholder="请输入文章标题(8到64字符)"
          show-count
          :maxlength="64"
          :bordered="false"
        >
          <template #prefix> <Icon icon="ph:article-medium-bold" /> </template>
        </Input>
      </div>
      <div class="flex justify-end">
        <Button class="mr-4" type="primary" ghost>
          <template #icon> <Icon icon="ri:draft-line" /> </template>
          <span>草稿箱</span></Button
        >
        <Button type="primary" @click="handleShowArticleModal">
          <template #icon>
            <Icon icon="fluent:save-20-regular" />
          </template>
          <span>发布</span>
        </Button>
      </div>
    </div>
    <ArticleMdEditor />
    <ArticleModalForm :articleModal="articleModal" />
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import ArticleMdEditor from './components/ArticleMdEditor.vue';
  import { Input, Button } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import ArticleModalForm from './components/ArticleModalForm.vue';
  const articleModal = reactive({
    title: '', // 文章标题
    modalVisible: false,
    modalTitle: '发布文章',
    okText: '发表',
  });
  // 打开modal
  const handleShowArticleModal = () => {
    articleModal.modalVisible = true;
    articleModal.modalTitle = '发布文章';
  };
</script>
<style lang="less" scoped></style>

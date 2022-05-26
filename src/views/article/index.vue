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
  import { onMounted, provide, reactive, ref } from 'vue';
  import ArticleMdEditor from './components/ArticleMdEditor.vue';
  import { Input, Button, message as Message } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import ArticleModalForm from './components/ArticleModalForm.vue';
  import { useRoute } from 'vue-router';
  import { getArticleByArticleId } from '/@/api/content/article';
  import { ResponseCode } from '/@/utils';

  const route = useRoute();
  // 拿到表格中的文章内容
  const article = reactive({
    content: '',
  });
  // 注册事件，文章内容的分发
  provide('articleContent', article);
  const articleModal = reactive({
    title: '', // 文章标题
    modalVisible: false,
    modalTitle: '发布文章',
    okText: '发表',
    article: {},
  });
  // 打开modal
  const handleShowArticleModal = () => {
    articleModal.modalVisible = true;
    articleModal.modalTitle = '发布文章';
  };
  const articleId = ref();
  onMounted(() => {
    // 获取文章内容
    getInitArticle();
  });
  const getInitArticle = async () => {
    const { redirectedFrom } = route;
    articleId.value = redirectedFrom?.params.articleId;
    const { code, result, message } = await getArticleByArticleId(articleId.value);
    if (code === ResponseCode.SUCCESS) {
      articleModal.article = result;
      article.content = result.content;
      Message.success(message);
    } else {
      Message.error(message);
    }
  };
</script>
<style lang="less" scoped></style>

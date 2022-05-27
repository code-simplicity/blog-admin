<!--
 * @Author: bugdr
 * @Date: 2022-05-09 10:58:50
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-27 11:06:18
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
        <Button class="mr-4" :disabled="disableDraftBtn">
          <template #icon> <Icon icon="ri:draft-line" /> </template>
          <span>草稿箱</span></Button
        >
        <Button type="primary" @click="handleShowArticleModal">
          <template #icon>
            <Icon icon="fluent:save-20-regular" />
          </template>
          <span>{{ commitText }}</span>
        </Button>
      </div>
    </div>
    <ArticleMdEditor :mdArticleContent="mdArticleContent" />
    <ArticleModalForm ref="articleModalRef" :articleModal="articleModal" />
  </div>
</template>
<script setup lang="ts">
  import { provide, reactive, ref } from 'vue';
  import ArticleMdEditor from './components/ArticleMdEditor.vue';
  import { Input, Button, message as Message } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import ArticleModalForm from './components/ArticleModalForm.vue';
  import { useRoute } from 'vue-router';
  import { getArticleByArticleId } from '/@/api/content/article';
  import { ResponseCode } from '/@/utils';

  const route = useRoute();
  // 拿到表格中的文章内容
  const articleContent = ref();
  // 文章内容
  // 注册事件，文章内容的分发
  provide('articleContent', articleContent.value);
  const articleModal = reactive({
    title: '', // 文章标题
    modalVisible: false,
    modalTitle: '发布文章',
    okText: '发表',
    article: {},
  });
  // 文章内容
  const mdArticleContent = ref();
  // 弹窗表单的ref
  const articleModalRef = ref();
  // 打开modal
  const handleShowArticleModal = () => {
    articleModal.modalVisible = true;
  };
  // 默认草稿箱按钮可以点击
  const disableDraftBtn = ref<boolean>(false);
  // 发布文章的按钮
  const commitText = ref<string>('发布');
  // 文章id
  const articleId = ref();
  const getInitArticle = async () => {
    const { redirectedFrom } = route;
    articleId.value = redirectedFrom?.params.articleId;
    // 判断文章id是否存在，可能是来自文章管理编辑的页面的，如果不存在就不会触发
    if (!articleId.value) return;
    // 文章id存在那就触发
    const { code, result, message } = await getArticleByArticleId(articleId.value);
    if (code === ResponseCode.SUCCESS) {
      // 传递文章内容给组件
      articleModal.article = result;
      // 获取文章标题
      articleModal.title = result.title;
      // 获取文章内容，传递给目的
      mdArticleContent.value = result.content;
      // 这里做一个判断，判断文章状态时什么，然后调整发布邮箱的按钮
      // 如果当前状态是草稿，按钮显示发表文章，2是草稿
      if (result.state === '2') {
        commitText.value = '发布';
        articleModal.okText = '发布';
        // 草稿箱禁用
        disableDraftBtn.value = false;
      } else {
        // 如果是已经发布、置顶或者删除的，那么就显示更新
        commitText.value = '更新';
        articleModal.okText = '更新';
        articleModal.modalTitle = '更新文章';
        //草稿这个按钮就不能用了
        disableDraftBtn.value = true;
        // 触发获取文章详情
        articleModalRef.value.initArticleDetail();
      }
      Message.success(message);
    } else {
      Message.error(message);
    }
  };

  // 获取文章内容
  getInitArticle();
</script>
<style lang="less" scoped></style>

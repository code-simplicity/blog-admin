<!--
 * @Author: bugdr
 * @Date: 2022-05-23 10:49:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-26 14:53:34
 * @FilePath: \blog-admin\src\views\article\components\ArticleMdEditor.vue
 * @Description:文章markdown编辑器
-->
<template>
  <div>
    <MdEditor
      v-model="mdEditorModel"
      :theme="mdEditor.theme"
      :pageFullScreen="mdEditor.pageFullScreen"
      :showCodeRowNumber="mdEditor.showCodeRowNumber"
      :noPrettier="mdEditor.noPrettier"
      :placeholder="mdEditor.placeholder"
      :style="{ height: `${mdHeight}` }"
    />
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, onMounted, inject, watch } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import { initHeight } from './mditor';

  // 事件观察
  const article = ref();
  article.value = inject('articleContent');
  // md高度
  const mdHeight = ref(initHeight());
  // md配置项
  const mdEditorModel = ref('');
  const mdEditor = reactive({
    theme: undefined, // 主题
    pageFullScreen: false, // 页面全屏
    showCodeRowNumber: true, // 代码块展示行号
    noPrettier: true, // 是否开启美化目的
    placeholder: '来吧，展示你的才华！！！', // 空白默认内容
  });
  // TODO:获取内容到md
  watch(
    () => article.value,
    (newVal) => {
      mdEditorModel.value = newVal;
    },
  );
  // markdown
  onMounted(() => {
    window.addEventListener('resize', () => {
      mdHeight.value = initHeight();
    });
    if (article.value.content !== '') {
      mdEditorModel.value = article.value.content;
    }
  });
</script>
<style lang="less" scoped></style>

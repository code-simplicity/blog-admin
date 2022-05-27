<!--
 * @Author: bugdr
 * @Date: 2022-05-23 10:49:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-27 23:22:32
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
  import { reactive, ref, onMounted, inject, watch, toRefs, nextTick } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import { initHeight } from './mditor';

  const props = defineProps({
    mdArticleContent: {
      type: String,
    }, //文章内容
  });
  // 事件观察内容，兄弟组件共享一个数据
  const mdEditorModel = ref<string>();
  const articleContent = inject('articleContent');
  const articleContentChange = inject('articleContentChange');
  // md高度
  const mdHeight = ref(initHeight());
  // md的数据绑定
  // 配置
  const mdEditor = reactive({
    theme: undefined, // 主题
    pageFullScreen: false, // 页面全屏
    showCodeRowNumber: true, // 代码块展示行号
    noPrettier: true, // 是否开启美化目的
    placeholder: '来吧，展示你的才华！！！', // 空白默认内容
  });
  watch(
    () => props.mdArticleContent,
    (newVal) => {
      mdEditorModel.value = newVal;
    },
  );
  // 观察内容是否变化,做出响应式更新
  watch(mdEditorModel, (newVal) => {
    initArticleContent(newVal);
  });

  // 获取内容
  const initArticleContent = (data) => {
    if (!data) return;
    articleContentChange(data);
  };

  // markdown
  onMounted(() => {
    window.addEventListener('resize', () => {
      mdHeight.value = initHeight();
    });
  });
  defineExpose({
    initArticleContent,
  });
</script>
<style lang="less" scoped></style>

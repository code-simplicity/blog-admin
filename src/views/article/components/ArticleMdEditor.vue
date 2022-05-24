<!--
 * @Author: bugdr
 * @Date: 2022-05-23 10:49:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-24 10:40:33
 * @FilePath: \blog-admin\src\views\article\components\ArticleMdEditor.vue
 * @Description:文章markdown编辑器
-->
<template>
  <div class="h-screen md:h-full" id="vditor"></div>
</template>
<script setup lang="ts">
  import { reactive, ref, onMounted, watch } from 'vue';

  import Vditor from 'vditor';
  // TODO:发布文章，响应式
  import 'vditor/dist/index.css';
  import { initVditor, initHeight } from './Vditor';
  // 编辑器的实例
  const vditorRef = ref<Vditor | null>(null);
  const language = 'zh_CN';
  const mdHeight = ref<number>(0);
  mdHeight.value = initHeight();
  watch(mdHeight, (newVal) => {
    mdHeight.value = newVal;
  });

  // markdown
  onMounted(() => {
    window.onresize = () => {
      return (() => {
        mdHeight.value = initHeight();
      })();
    };

    vditorRef.value = initVditor('vditor', language, mdHeight.value);
  });
</script>
<style lang="less" scoped></style>

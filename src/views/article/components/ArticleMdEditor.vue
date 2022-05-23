<!--
 * @Author: bugdr
 * @Date: 2022-05-23 10:49:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-23 16:27:33
 * @FilePath: \blog-admin\src\views\article\components\ArticleMdEditor.vue
 * @Description:文章markdown编辑器
-->
<template>
  <div class="h-screen md:h-full" id="vditor"></div>
</template>
<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';

  import Vditor from 'vditor';
  import 'vditor/dist/index.css';
  import { initVditor } from './Vditor';
  // 编辑器的实例
  const vditorRef = ref<Vditor | null>(null);
  const language = 'zh_CN';
  // markdown
  onMounted(() => {
    vditorRef.value = initVditor('vditor', language);
  });
</script>
<style lang="less" scoped></style>

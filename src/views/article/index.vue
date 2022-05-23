<!--
 * @Author: bugdr
 * @Date: 2022-05-09 10:58:50
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-23 09:42:03
 * @FilePath: \blog-admin\src\views\article\index.vue
 * @Description: 发布文章
-->
<template>
  <div>
    <MdEditor v-model="text" />
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  const text = ref('Hello Editor!');
  // TODO:明天写发布文章的界面
</script>
<style lang="less" scoped></style>

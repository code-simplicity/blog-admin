<!--
 * @Author: bugdr
 * @Date: 2022-05-09 11:04:54
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-21 14:39:56
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\index.vue
 * @Description: 图片分类管理
-->
<template>
  <div class="px-4 md:flex flex-1">
    <div class="md:w-2/10 bg-white md:mr-4 !my-4">
      <leftTree />
    </div>
    <div class="md:w-8/10 !my-4">
      <rightTable />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { provide, ref } from 'vue';
  import rightTable from './components/rightTable.vue';
  import leftTree from './components/leftTree.vue';
  // 使用provide这种方式实现
  const userIdActive = ref();
  // 依赖注入
  provide('userIdActive', userIdActive);
</script>
<style lang="less" scoped></style>

<!--
 * @Author: bugdr
 * @Date: 2022-05-09 11:04:54
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 22:32:51
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\index.vue
 * @Description: 图片分类管理
-->
<template>
  <div class="p-4 md:flex">
    <div class="w-2/10 bg-white mr-4">
      <leftTree />
    </div>
    <div class="w-8/10">
      <rightTable />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import rightTable from './components/rightTable.vue';
  import leftTree from './components/leftTree.vue';
  // TODO:图片分类列表的选择
</script>
<style lang="less" scoped></style>

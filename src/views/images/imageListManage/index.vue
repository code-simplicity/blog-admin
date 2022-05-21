<!--
 * @Author: bugdr
 * @Date: 2022-05-09 11:05:20
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-21 14:41:30
 * @FilePath: \blog-admin\src\views\images\imageListManage\index.vue
 * @Description: 图片管理
-->
<template>
  <div class="md:flex px-4 flex-1">
    <div class="md:w-1/5 w-full mr-4 !my-4">
      <LeftCard />
    </div>
    <div class="md:w-4/5 w-full my-4">
      <RightContent />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import LeftCard from './components/LeftCard.vue';
  import RightContent from './components/RightContent.vue';
</script>
<style lang="less" scoped></style>

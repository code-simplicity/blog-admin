<!--
 * @Author: bugdr
 * @Date: 2022-05-23 12:17:01
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-23 12:19:23
 * @FilePath: \blog-admin\src\views\article\components\articleModelForm.vue
 * @Description:文章发布的弹窗表单
-->
<template>
  <div>
    <Form>
      <FormItem>
        <Input />
      </FormItem>
    </Form>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Form, FormItem } from 'ant-design-vue';
</script>
<style lang="less" scoped></style>

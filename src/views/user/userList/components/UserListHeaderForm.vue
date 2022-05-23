<!--
 * @Author: bugdr
 * @Date: 2022-05-06 15:07:44
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-22 18:21:47
 * @FilePath: \blog-admin\src\views\user\userList\components\UserListHeaderForm.vue
 * @Description: 头部表单
-->
<template>
  <Form
    ref="formRef"
    :model="userModel"
    :label-col="{ span: 4 }"
    class="grid grid-cols-1 md:grid-cols-3 items-center"
  >
    <FormItem label="用户名" name="userName">
      <Input
        v-model:value="userModel.userName"
        :placeholder="t('sys.login.registerUserName')"
        allowClear
      />
    </FormItem>
    <FormItem label="邮箱" name="email">
      <Input
        v-model:value="userModel.email"
        :placeholder="t('sys.login.emailPlaceholder')"
        allowClear
      />
    </FormItem>
    <div class="mt-3 md:my-2">
      <Button class="mr-4" type="primary" :loading="loadingBtn" @click="handleSearchUser">
        <template #icon><SearchOutlined /></template>
        搜索</Button
      >
      <Button type="primary" danger @click="handleResetUser">
        <template #icon><SyncOutlined /></template>
        重置
      </Button>
    </div>
  </Form>
</template>
<script setup lang="ts">
  import { ref, reactive, defineEmits } from 'vue';
  import { Input, Button, Form, FormItem } from 'ant-design-vue';
  import { SearchOutlined, SyncOutlined } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue/es/form/Form';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  const userModel = reactive({
    userName: '',
    email: '',
  });
  // loading
  const loadingBtn = ref<boolean>(false);
  const formRef = ref<FormInstance>();
  const emit = defineEmits(['handleSearchUser', 'handleResetUser']);
  // 搜索
  const handleSearchUser = () => {
    emit('handleSearchUser', userModel);
  };
  const handleResetUser = () => {
    // 清除表单，然后传递事件，触发搜索
    if (formRef.value) formRef.value.resetFields();
    // 清除表单的值
    emit('handleResetUser');
  };
</script>
<style lang="less" scoped>
  .ant-form-item {
    margin-bottom: 0;
    margin-right: 10px;
  }
</style>

<!--
 * @Author: bugdr
 * @Date: 2022-05-08 20:52:19
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-21 13:10:51
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\components\HeaderForm.vue
 * @Description: 文章列表头部组件
-->
<template>
  <Form
    ref="articleRef"
    :model="imageCategoryForm"
    :label-col="{ span: 5 }"
    class="grid grid-rows-1 md:grid-cols-2 items-center"
  >
    <FormItem label="分类名称">
      <Input
        v-model:value="imageCategoryForm.categoryName"
        allowClear
        :placeholder="t('sys.imageCategory.categoryNamePlaceholder')"
        @pressEnter="handleSearch"
      />
    </FormItem>
    <div class="mr-10 mt-3 md:my-2">
      <Button class="mr-4" type="primary" @click="handleSearch">
        <template #icon><SearchOutlined /></template>
        搜索</Button
      >
      <Button class="mr-4" type="primary" danger @click="handleReset">
        <template #icon><UndoOutlined /></template>
        重置</Button
      >
      <Button type="primary" class="mr-4" ghost @click="handleSubmit">
        <template #icon><PlusOutlined /></template>
        添加</Button
      >
    </div>
  </Form>
</template>
<script setup lang="ts">
  import { reactive, ref, defineEmits, computed } from 'vue';
  import { Form, FormItem, Input, message as Message, Button } from 'ant-design-vue';
  import { SearchOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue/es/form/Form';
  import { useI18n } from '../../../../hooks/web/useI18n';
  import { ResponseCode } from '../../../../utils';
  import { addImageCategory } from '../../../../api/images/imageCategory';
  import { useUserStore } from '../../../../store/modules/user';

  const userStore = useUserStore();
  const { t } = useI18n();

  // 获取用户信息
  const getUserInfo = computed(() => {
    const { id } = userStore.getUserInfo;
    return { id };
  });
  const imageCategoryForm = reactive({
    categoryName: undefined,
  });
  // emit
  const emit = defineEmits(['handleSearch']);
  // 表单的ref
  const articleRef = ref<FormInstance>();
  // 搜索
  const handleSearch = () => {
    const params = {
      categoryName: imageCategoryForm.categoryName,
    };
    // 事件分发
    emit('handleSearch', params);
  };
  // 添加
  const handleSubmit = async () => {
    // 判断输入框
    if (!imageCategoryForm.categoryName) {
      Message.error('请输入图片分类名称');
      return;
    }
    const params = {
      userId: getUserInfo.value.id,
      categoryName: imageCategoryForm.categoryName,
    };
    const result = await addImageCategory(params);
    if (result.code === ResponseCode.SUCCESS) {
      // 添加成功
      Message.success(result.message);
      const params = {
        userId: getUserInfo.value.id,
      };
      // 刷新表格
      emit('handleSearch', params);
      // 表单重置
      await resetForm();
    } else {
      Message.error(result.message);
    }
  };
  // 重置
  const handleReset = async () => {
    // 重置表单
    const params = {
      page: 1,
      size: 10,
    };
    // 刷新表格
    emit('handleSearch', params);
    await resetForm();
  };
  // 重置表单
  const resetForm = async () => {
    imageCategoryForm.categoryName = null;
  };
</script>
<style lang="less" scoped>
  .ant-form-item {
    margin-bottom: 0;
    margin-right: 10px;
  }
</style>

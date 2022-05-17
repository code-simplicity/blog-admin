<!--
 * @Author: bugdr
 * @Date: 2022-05-09 13:08:04
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-17 18:18:02
 * @FilePath: \blog-admin\src\views\operation\categoryManage\components\CategoryModalForm.vue
 * @Description: 头部表单
-->
<template>
  <div class="P-2">
    <Modal
      :visible="categoryModal.isShowCategoryModal"
      :title="categoryModal.categoryFormTitle"
      @cancel="handleCancel"
      :maskClosable="false"
    >
      <Form
        :model="categoryModel"
        :rules="getFormRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ref="categoryFormRef"
        @resetFields="handleCancel"
      >
        <FormItem label="分类名称" name="name">
          <Input
            v-model:value="categoryModel.name"
            :placeholder="t('sys.category.namePlaceholder')"
          />
        </FormItem>
        <FormItem label="分类拼音" name="pinyin">
          <Input
            v-model:value="categoryModel.pinyin"
            :placeholder="t('sys.category.pinyinPlaceholder')"
          />
        </FormItem>
        <FormItem label="状态" name="status">
          <Select
            v-model:value="categoryModel.status"
            :options="selectOption"
            :placeholder="t('sys.category.statusPlaceholder')"
          />
        </FormItem>
        <FormItem label="顺序" name="order">
          <InputNumber
            v-model:value="categoryModel.order"
            :min="0"
            :max="100"
            style="width: 100%"
            :placeholder="t('sys.category.orderPlaceholder')"
          />
        </FormItem>
        <FormItem label="描述" name="description">
          <Textarea
            v-model:value="categoryModel.description"
            show-count
            :maxlength="200"
            :placeholder="t('sys.category.descriptionPlaceholder')"
          />
        </FormItem>
      </Form>
      <template #footer>
        <Button key="back" @click="handleCancel">{{ categoryModal.cancelCategoryText }}</Button>
        <Button key="submit" type="primary" :loading="loading" @click="handleSubmit">{{
          categoryModal.okCategoryText
        }}</Button>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { ref, defineProps, unref } from 'vue';
  import {
    Modal,
    Form,
    FormItem,
    Input,
    Button,
    Textarea,
    InputNumber,
    Select,
    message as Message,
  } from 'ant-design-vue';
  import { CategorySelectOption, FormState } from './model/categoryForm';
  import { categoryFormRules, categoryFormValid } from '../categoryManage';
  import { addCategory } from '/@/api/operation/category';
  import { ResponseCode } from '/@/utils';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  const props = defineProps({
    categoryModal: {
      type: Object,
      default: () => {
        return {
          isShowCategoryModal: false,
          // 标题
          categoryFormTitle: '',
          // 取消按钮文字
          cancelCategoryText: '',
          // 确定按钮文字
          okCategoryText: '',
        };
      },
    },
  });
  const emit = defineEmits(['initCategoryTable']);
  // 按钮的loading
  const loading = ref<boolean>(false);
  let categoryModel = ref<FormState>({
    name: '',
    pinyin: '',
    status: undefined,
    order: '',
    description: '',
  });
  // 判断是修改还是添加
  const initModalForm = () => {
    if (props.categoryModal.categoryModel) {
      categoryModel.value = props.categoryModal.categoryModel;
      console.log('props.categoryModal.categoryModel', categoryModel);
    }
  };
  // 表单的ref
  const categoryFormRef = ref();
  // 选择框的配置
  const selectOption = ref(CategorySelectOption());
  // 表单的label的宽度
  const labelCol = { style: { width: '100px' } };
  const wrapperCol = { span: 18 };
  // 验证规则
  const { getFormRules } = categoryFormRules();
  // 表单验证，
  const { validForm } = categoryFormValid(categoryFormRef);

  // 控制弹窗按钮提交
  const handleSubmit = async () => {
    loading.value = true;
    // 验证规则
    const data = await validForm();
    const form = unref(categoryFormRef);
    if (!data) return;
    // 添加
    const result = await addCategory(data);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
      loading.value = false;
      // 关闭弹窗
      handleCancel();
      // 刷新表格,采用自定义事件告诉父组件
      emit('initCategoryTable');
      // 清除表单数据
      await form.resetFields();
    } else {
      Message.error(result.message);
      loading.value = false;
    }
  };
  // 取消弹窗
  const handleCancel = () => {
    const form = unref(categoryFormRef);
    const { categoryModal } = props;
    categoryModal.isShowCategoryModal = false;
    form.resetFields();
  };
  // 导出export
  defineExpose({
    categoryModel,
    initModalForm,
  });
</script>
<style lang="less" scoped></style>

<!--
 * @Author: bugdr
 * @Date: 2022-05-18 09:56:15
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 16:01:42
 * @FilePath: \blog-admin\src\views\operation\looperManage\components\LooperModal.vue
 * @Description:弹窗
-->
<template>
  <Modal
    :visible="modalValue.visible"
    :title="modalValue.title"
    :mask-closable="false"
    @cancel="handleCancel"
  >
    <Form
      :model="looperModel"
      :rules="getFormRules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      ref="looperFormRef"
      @resetFields="handleCancel"
    >
      <FormItem label="轮播图标题" name="title">
        <Input v-model:value="looperModel.title" :placeholder="t('sys.looper.titlePlaceholder')" />
      </FormItem>
      <FormItem label="跳转连接" name="targetUrl">
        <Input
          v-model:value="looperModel.targetUrl"
          :placeholder="t('sys.looper.targetUrlPlaceholder')"
        />
      </FormItem>
      <FormItem label="顺序" name="order">
        <InputNumber
          v-model:value="looperModel.order"
          style="width: 100%"
          :placeholder="t('sys.looper.orderPlaceholder')"
        />
      </FormItem>
      <FormItem label="状态" name="state">
        <Select
          v-model:value="looperModel.state"
          :options="selectOption"
          :placeholder="t('sys.looper.statePlaceholder')"
          allowClear
        />
      </FormItem>
      <FormItem label="图片分类" name="imageCategoryId">
        <Select
          v-model:value="looperModel.imageCategoryId"
          :placeholder="t('sys.looper.imageCategoryIdPlaceholder')"
          allowClear
          @select="handleChangeSelect"
        >
          <a-select-option
            v-for="item in imageCategoryList"
            :key="item.id"
            :value="item.categoryName"
          />
        </Select>
      </FormItem>
      <FormItem label="封面" name="imageUrl">
        <Upload
          :file-list="fileList"
          name="file"
          list-type="picture-card"
          :customRequest="customRequestImage"
          :beforeUpload="beforeUploadImage"
        >
          <Image v-if="looperModel.imageUrl" :src="looperModel.imageUrl" alt="looper" />
          <div v-else>
            <LoadingOutlined v-if="uploadLoading" />
            <PlusOutlined v-else />
            <div class="text-center text-blue-600 text-sm mt-2">上传轮播图</div>
          </div>
        </Upload>
      </FormItem>
    </Form>
    <template #footer>
      <Button key="back" @click="handleCancel">{{ modalValue.cancelText }}</Button>
      <Button key="submit" type="primary" @click="handleSubmit">{{ modalValue.okText }}</Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import {
    Modal,
    Form,
    FormItem,
    Input,
    Upload,
    Select,
    InputNumber,
    Button,
    Image,
    message as Message,
  } from 'ant-design-vue';
  import { LooperSelectOption, FormState } from './model/looperForm';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { UploadProps } from 'ant-design-vue';
  import { getImageCategoryList } from '/@/api/images/imageCategory';
  import { ResponseCode, uploadBeforeImageValid } from '/@/utils';
  import { uploadImage } from '/@/api/images/imageList';
  import { addLooper, updateLooper } from '/@/api/operation/looper';
  import { looperFormValid, looperFormRules } from './looperManage';

  const { t } = useI18n();
  const props = defineProps({
    modalValue: {
      type: Object,
      default: () => {
        return {
          title: '',
          visible: false,
          // 取消按钮文字
          cancelText: '',
          // 确定按钮文字
          okText: '',
        };
      },
    },
  });

  const emit = defineEmits(['initLooperTable']);
  let looperModel = ref<FormState>({
    title: '',
    order: '',
    state: undefined,
    targetUrl: '',
    imageUrl: '',
    imageCategoryId: undefined, // 轮播图分类
  });
  // 轮播图的ref
  const looperFormRef = ref();
  // 表单的label的宽度
  const labelCol = { style: { width: '100px' } };
  const wrapperCol = { span: 18 };
  // 选择框的配置
  const selectOption = ref(LooperSelectOption());
  // 表单验证规则
  const { getFormRules } = looperFormRules();
  // 表单验证
  const { validForm } = looperFormValid(looperFormRef);
  // 弹窗取消
  const handleCancel = async () => {
    const { modalValue } = props;
    modalValue.visible = false;
    // 重置表单
    looperModel.value = {};
    await looperFormRef.value.resetFields();
  };
  // 图片分类列表
  const imageCategoryList = ref();
  // 获取图片分类
  const getImageCategory = async () => {
    const params = {
      page: 1,
      size: 100,
    };
    const result = await getImageCategoryList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents } = result.result;
      imageCategoryList.value = contents;
    }
  };
  getImageCategory();
  const imageCategoryIdValue = ref<string>();
  // 控制选择select
  const handleChangeSelect = (value, options) => {
    imageCategoryIdValue.value = options.key;
  };
  // 上传触发拦截
  const beforeUploadIntercept = ref<boolean>(false);
  // 上传之前的回调,这里做校验，校验图片的大小和类型
  const beforeUploadImage = async (file) => {
    const result = await uploadBeforeImageValid(file);
    beforeUploadIntercept.value = result;
    // 验证失败之后不会触发自定义上传
  };
  // 自定义上传图片，采用axios封装的formdata
  const customRequestImage = async (file) => {
    const params = {
      original: 'looper',
      imageCategoryId: imageCategoryIdValue.value ? imageCategoryIdValue.value : null,
      file: file,
    };
    if (!beforeUploadIntercept.value) return;
    const { data } = await uploadImage(params);
    if (data.code === ResponseCode.SUCCESS) {
      // 图片上传成功，回显
      looperModel.value.imageUrl = data.result.url;
    } else {
      Message.error(data.message);
    }
  };

  // 判断弹窗表单是添加还是修改
  const initModalForm = async () => {
    // 判断是否存在
    if (props.modalValue.looperModel) {
      looperModel.value = props.modalValue.looperModel;
    }
  };

  // 提交
  const handleSubmit = async () => {
    const data = await validForm();
    if (!data) return;
    // 通过判断是更新还是添加
    if (props.modalValue.looperModel) {
      // 走更新流程
      const params = props.modalValue.looperModel;
      const result = await updateLooper(params);
      if (result.code === ResponseCode.SUCCESS) {
        Message.success(result.message);
        // 重置表单
        await handleCancel();
        // 刷新表格,采用自定义事件告诉父组件
        emit('initLooperTable');
      } else {
        Message.error(result.message);
      }
    } else {
      const params = looperModel.value;
      const result = await addLooper(params);
      if (result.code === ResponseCode.SUCCESS) {
        Message.success(result.message);
        // 重置表单
        await handleCancel();
        // 刷新表格,采用自定义事件告诉父组件
        emit('initLooperTable');
      } else {
        Message.error(result.message);
      }
    }
  };
  // 上传轮播图的加载
  const uploadLoading = ref<boolean>(false);
  const fileList = ref<UploadProps['fileList']>([]);
  defineExpose({
    initModalForm,
  });
</script>
<style lang="less" scoped></style>

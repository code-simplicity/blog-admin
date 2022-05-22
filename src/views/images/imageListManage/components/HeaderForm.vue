<!--
 * @Author: bugdr
 * @Date: 2022-05-21 15:27:30
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-22 07:26:59
 * @FilePath: \blog-admin\src\views\images\imageListManage\components\HeaderForm.vue
 * @Description:头部表单
-->
<template>
  <div class="mb-4 bg-white p-2">
    <Form
      :model="imageHeaderForm"
      :label-col="labelCol"
      class="grid grid-rows-1 md:grid-cols-3 items-center"
    >
      <FormItem label="图片分类">
        <Select
          v-model:value="imageHeaderForm.categoryId"
          :placeholder="t('sys.image.imageCategoryPlaceholder')"
          allowClear
          :options="optionsCategory"
          :field-names="fieldNames"
          @popupScroll="popupScrollHandle"
        />
      </FormItem>
      <FormItem label="文章来源">
        <Input
          v-model:value="imageHeaderForm.original"
          :placeholder="t('sys.image.originalPlaceholder')"
          allowClear
        />
      </FormItem>
      <div class="md:my-2 mt-2">
        <Button class="mr-4" type="primary" @click="searchImageList">
          <template #icon>
            <SearchOutlined />
          </template>
          <span>搜索</span>
        </Button>
        <Button type="primary" danger @click="resetImageForm">
          <template #icon>
            <UndoOutlined />
          </template>
          <span>重置</span>
        </Button>
      </div>
    </Form>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, defineEmits } from 'vue';
  import { Form, FormItem, Input, Select, Button, message as Message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { SearchOutlined, UndoOutlined } from '@ant-design/icons-vue';
  import { getImageCategoryList } from '/@/api/images/imageCategory';
  import { ResponseCode } from '/@/utils';

  const emit = defineEmits(['searchImageList', 'resetImageForm']);

  const { t } = useI18n();
  const labelCol = ref({
    style: {
      width: '80px',
    },
  });
  // 表单的form
  const imageHeaderForm = reactive({
    categoryId: undefined,
    original: '',
  });
  // 文章分类配置
  const optionsCategory = ref();
  // 自定义字段
  const fieldNames = ref({
    label: 'categoryName',
    value: 'id',
  });
  const pagination = reactive({
    page: 1,
    size: 10,
  });
  // 获取图片分类
  const initImage = async (data) => {
    const result = await getImageCategoryList(data);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents } = result.result;
      optionsCategory.value = contents;
    } else {
      Message.error(result.message);
    }
  };
  initImage(pagination);
  // 下拉滚动
  const popupScrollHandle = () => {
    // 触发下拉滚动
    const params = {
      page: pagination.page + 1,
      size: pagination.size,
    };
    initImage(params);
  };
  // 搜索
  const searchImageList = () => {
    // 触发emit
    emit('searchImageList', imageHeaderForm);
  };
  // 重置
  const resetImageForm = () => {
    imageHeaderForm.categoryId = undefined;
    imageHeaderForm.original = '';
    emit('resetImageForm');
  };
</script>
<style lang="less" scoped>
  :deep(.ant-form-item) {
    margin-bottom: 0;
    margin-right: 10px;
  }
</style>

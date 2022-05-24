<!--
 * @Author: bugdr
 * @Date: 2022-05-23 12:17:01
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-24 17:19:04
 * @FilePath: \blog-admin\src\views\article\components\articleModalForm.vue
 * @Description:文章发布的弹窗表单
-->
<template>
  <div>
    <Modal
      :visible="articleModal.modalVisible"
      :dialogStyle="dialogStyle"
      :title="articleModal.modalTitle"
      :destroyOnClose="true"
      :maskClosable="false"
      :confirmLoading="articleModal.confirmLoading"
      @cancel="cancelHandle"
      :okText="articleModal.okText"
      @ok="submitSaveArticle"
    >
      <Form
        :model="articleModel"
        :rules="getFormRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ref="articleModelRef"
      >
        <FormItem label="文章分类" name="categoryId">
          <Select
            v-model:value="articleModel.categoryId"
            :placeholder="t('sys.article.categoryId')"
            :options="articleModel.categories"
            :field-names="{ label: 'name', value: 'id' }"
            @select="handleChangeSelect"
          />
        </FormItem>
        <FormItem label="封面" name="cover">
          <div class="w-26 h-26 bg-gray-200 cursor-pointer" @click="showImageView">
            <Image
              class="w-26 h-26"
              v-if="articleModel.cover"
              :src="articleModel.cover"
              alt="looper"
            />
            <div class="md:flex flex-col items-center justify-center w-26 h-26" v-else>
              <LoadingOutlined v-if="uploadLoading" />
              <PlusOutlined v-else />
              <div class="text-center text-sm mt-2">上传轮播图</div>
            </div>
          </div>
        </FormItem>
        <FormItem label="编辑摘要" name="summary">
          <Textarea
            v-model:value="articleModel.summary"
            :placeholder="t('sys.article.summaryPlaceholder')"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </FormItem>
        <FormItem label="标签" name="label">
          <Tag
            closable
            color="blue"
            v-for="item in articleModel.labels"
            :key="item"
            @close="deleteLabel(item)"
            >{{ item }}</Tag
          >
          <Input
            class="mr-2"
            style="width: 80px"
            size="small"
            allowClear
            v-model:value="articleModel.inputLabel"
            v-if="articleModel.labelInputVisible"
            ref="labelInputRef"
            @pressEnter="handleLabelInputConfirm"
          />
          <Button size="small" @click="showLabelInput">添加标签</Button>
        </FormItem>
      </Form>
    </Modal>
    <ImageView :imageModal="imageModal" />
  </div>
</template>
<script setup lang="ts">
  import { ref, defineProps, reactive, nextTick } from 'vue';
  import {
    Form,
    FormItem,
    Modal,
    Select,
    Tag,
    Button,
    Input,
    Textarea,
    Upload,
    Image,
    message as Message,
  } from 'ant-design-vue';
  import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getCategoryList } from '../../../api/operation/category';
  import { ResponseCode } from '../../../utils';
  import { articleFormValid, articleFormRules } from './articleForm';
  import { postArticle } from '../../../api/content/article';
  import ImageView from './ImageView.vue';

  const { t } = useI18n();

  const props = defineProps({
    articleModal: {
      type: Object,
      default: () => {
        return {
          modalVisible: false,
          modalTitle: '发布文章',
          article: {},
          okText: '确认',
          title: '', // 文章标题
        };
      },
    },
  });
  const dialogStyle = ref({
    top: '10px',
  });
  const articleModel = reactive({
    categoryId: undefined, // 文章分类
    categorized: '', // 被选中的文章分类
    summary: '', // 摘要
    cover: '', // 轮播图背景
    labels: [], // 文章标签
    labelInputVisible: false, // 标签输入框是否显示
    inputLabel: '', // 输入框label
    categories: [], // 文章分类
    confirmLoading: false, // 确认按钮loading
  });
  // 表单的ref
  const articleModelRef = ref();
  // 表单验证规则
  const { validForm } = articleFormValid(articleModelRef);
  const { getFormRules } = articleFormRules();
  // 取消弹窗
  const cancelHandle = () => {
    const { articleModal } = props;
    articleModal.modalVisible = false;
    resetForm();
  };
  // 是否正在上传
  const uploadLoading = ref<boolean>(false);
  const labelCol = { style: { width: '100px' } };
  const wrapperCol = { span: 18 };
  // 删除标签
  const deleteLabel = (el) => {
    // 删除el
    articleModel.labels.splice(articleModel.labels.indexOf(el), 1);
    if (articleModel.labels.length < 5) {
      articleModel.labelInputVisible = true;
    }
    console.log('articleModel.labels :>> ', articleModel.labels);
  };
  // label输入框获取焦点
  const labelInputRef = ref();
  // 添加标签显示框
  const showLabelInput = () => {
    // 判断输入个数
    if (articleModel.labels.length < 5) {
      // 显示输入框
      articleModel.labelInputVisible = true;
    } else {
      articleModel.labelInputVisible = false;
    }
    // 获取焦点
    nextTick(() => {
      labelInputRef.value.focus();
    });
  };
  // 回车添加标签
  const handleLabelInputConfirm = () => {
    if (articleModel.labels.length < 5) {
      articleModel.labels.push(articleModel.inputLabel);
      articleModel.inputLabel = '';
    } else {
      // 隐藏输入框
      articleModel.labelInputVisible = false;
    }
  };
  const pagination = reactive({
    page: 1,
    size: 10,
  });
  // 获取文章分类
  const initCategory = async (data) => {
    const params = {
      page: data.page,
      size: data.size,
    };
    const result = await getCategoryList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents } = result.result;
      articleModel.categories = contents;
    }
  };
  initCategory(pagination);
  // 重置表单
  const resetForm = () => {
    articleModel.categories = [];
    articleModel.labels = [];
    articleModel.cover = '';
    articleModel.summary = '';
    articleModel.categoryId = undefined;
    articleModelRef.value.resetFields();
  };
  // 控制选择select
  const handleChangeSelect = (value, options) => {
    articleModel.categorized = options.key;
  };
  // 保存文章
  const submitSaveArticle = async () => {
    // 首先判断文章标题、内容、分类、封面、摘要、标签是否为空
    const { articleModal } = props;
    if (!articleModal.title) {
      return Message.error('请起一个文章标题吧');
    }
    // 表单验证
    const form = await validForm();
    // 验证失败返回
    if (!form) return;
    const params = {
      title: articleModal.title,
    };
    const result = await postArticle(params);
  };
  // 图片列表的选择
  const imageModal = reactive({
    imageVisible: false,
    imageTitle: '选择图片',
  });
  // 展示图片选择弹窗
  const showImageView = () => {
    imageModal.imageVisible = true;
  };
</script>
<style lang="less" scoped></style>

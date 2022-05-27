<!--
 * @Author: bugdr
 * @Date: 2022-05-23 12:17:01
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-27 11:03:53
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
              width="100%"
              height="100%"
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
        <FormItem label="标签" name="labels">
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
          <Button v-if="!articleModel.labelInputVisible" size="small" @click="showLabelInput"
            >添加标签</Button
          >
        </FormItem>
      </Form>
      <template #footer>
        <Button key="back" @click="cancelHandle">取消</Button>
        <Button key="submit" type="primary" @click="submitSaveArticle">{{
          articleModal.okText
        }}</Button>
      </template>
    </Modal>
    <ImageView :imageModal="imageModal" @submitBackImageUrl="submitBackImageUrl" />
  </div>
</template>
<script setup lang="ts">
  import { ref, defineProps, reactive, nextTick, inject, onMounted } from 'vue';
  import {
    Form,
    FormItem,
    Modal,
    Select,
    Tag,
    Button,
    Input,
    Textarea,
    Image,
    message as Message,
  } from 'ant-design-vue';
  import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { getCategoryList } from '../../../api/operation/category';
  import { ResponseCode } from '../../../utils';
  import { articleFormValid, articleFormRules } from './articleForm';
  import { postArticle } from '../../../api/content/article';
  import ImageView from './ImageView.vue';
  import { useI18n } from '../../../hooks/web/useI18n';

  const { t } = useI18n();

  const article = ref();
  // 事件观察，文章内容
  article.value = inject('articleContent');

  const props = defineProps({
    articleModal: {
      type: Object,
      default: () => {
        return {
          modalVisible: false,
          modalTitle: '发布文章',
          okText: '确认',
          title: '', // 文章标题
          article: {}, // 文章内容
        };
      },
    },
  });
  const dialogStyle = ref({
    top: '10px',
  });

  const articleModel = reactive({
    id: '', // 文章id
    categoryId: undefined, // 文章分类
    categorized: '', // 被选中的文章分类
    summary: '', // 摘要
    cover: '', // 轮播图背景
    labels: [], // 文章标签数组
    label: '', // 文章标签
    labelInputVisible: false, // 标签输入框是否显示
    inputLabel: '', // 输入框label
    categories: [], // 文章分类
    confirmLoading: false, // 确认按钮loading
    state: '1', // 文章状态 0表示删除、1表示已经发布、2表示草稿、3、表示置顶
    title: '', // 文章title
    type: '1', // 文章类型0或者1
    userId: '', // 用户id
    viewCount: 0, // 浏览量
    content: '', // 内容
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
    // articleModel.categories = [];
    // articleModel.labels = [];
    // articleModel.cover = '';
    // articleModel.summary = '';
    // articleModel.categoryId = undefined;
    articleModelRef.value.resetFields();
  };
  // 控制选择select
  const handleChangeSelect = (value) => {
    articleModel.categoryId = value;
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
    const { labels, cover, summary, categoryId, content, state, type } = articleModel;
    // 处理标签
    let tempLabels = '';
    labels.forEach((item, index) => {
      tempLabels += item;
      if (index !== labels.length - 1) {
        tempLabels += '-';
      }
    });
    articleModel.label = tempLabels;
    const params = {
      title: articleModal.title,
      content: content ? content : article.value,
      categoryId: categoryId,
      summary: summary,
      cover: cover,
      label: articleModel.label,
      id: articleModel.id ? articleModel.id : null,
      type: type,
    };
    // 判断文章是更新还是添加
    // 添加
    if (articleModel.id === '') {
      const data = {
        ...params,
        state: state,
      };
      const result = await postArticle(data);
      if (result.code === ResponseCode.SUCCESS) {
        Message.success(result.message);
      } else {
        Message.error(result.message);
      }
    } else {
      // 更新
    }
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
  // 返回图片列表Url的自定义事件
  const submitBackImageUrl = (url) => {
    articleModel.cover = url;
  };
  // 初始化表单，判断是初始化还是获取更新文章
  const initArticleDetail = () => {
    const { articleModal } = props;
    if (!articleModal.article) return;
    // 存在值那么就是更新，替换表单的值
    console.log('articleModal.article', articleModal.article);
    const { categoryId, summary, cover, labels, state, type, id } = JSON.parse(
      JSON.stringify(articleModal.article),
    );
    articleModel.categoryId = categoryId;
    articleModel.summary = summary;
    articleModel.cover = cover;
    articleModel.labels = labels;
    articleModel.state = state;
    articleModel.type = type;
    articleModel.id = id;
  };
  // initArticleDetail();
  // onMounted(() => {
  //   nextTick(() => {
  //     initArticleDetail();
  //   });
  // });
  defineExpose({
    initArticleDetail,
  });
</script>
<style lang="less" scoped></style>

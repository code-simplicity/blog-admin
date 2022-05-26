<!--
 * @Author: bugdr
 * @Date: 2022-05-24 16:43:42
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-26 10:08:06
 * @FilePath: \blog-admin\src\views\article\components\ImageView.vue
 * @Description:图片的列表
-->
<template>
  <Modal
    :visible="imageModal.imageVisible"
    :title="imageModal.imageTitle"
    :maskClosable="false"
    width="800px"
    @cancel="cancelHandleImageView"
    :okText="imageModal.okText"
  >
    <div class="md: flex w-full p-4">
      <div class="md:w-1/5 md:flex flex-col items-center border-r-1 border-black md:mx-2">
        <Tabs
          v-model:activeKey="imageCategoryKey"
          :tab-position="tabPosition"
          :tabBarGutter="6"
          type="card"
          :style="{ height: '460px' }"
          @change="changeImageCategoryValue"
        >
          <TabPane v-for="item in imageCategoryItem" :key="item.id" :tab="item.categoryName" />
        </Tabs>
      </div>
      <div class="md:w-4/5 md:flex flex-col">
        <div class="md:flex items-center">
          <Upload
            name="file"
            :customRequest="customRequestImage"
            :beforeUpload="beforeUploadImage"
            :showUploadList="false"
            accept="image/*"
          >
            <Button>
              <UploadOutlined />
              上传图片</Button
            >
          </Upload>
          <span class="ml-2 text-base text-gray-400">
            <SyncOutlined v-if="isUploading" spin />
            {{ uploadText }}</span
          >
        </div>
        <div class="mt-4 grid gap-1 md:gap-2 grid-cols-4">
          <RadioGroup
            v-model:value="selectIndexImage"
            v-for="(item, index) in ImageList"
            :key="index"
            @change="checkImage(item)"
          >
            <RadioButton
              style="width: 140px; height: 130px; border-radius: 6px"
              :autofocus="true"
              :value="item"
            >
              <Image
                class="rounded-lg"
                width="100%"
                height="100%"
                :preview="false"
                :src="item.url"
                :alt="item.name"
              />
            </RadioButton>
          </RadioGroup>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="md:flex items-center">
        <div class="flex-1">
          <Pagination
            v-model:current="pagination.current"
            v-model:pageSize="pagination.pageSize"
            show-quick-jumper
            :total="pagination.total"
            :pageSizeOptions="pagination.pageSizeOptions"
            :showTotal="pagination.showTotal"
            @change="pageChange"
          />
        </div>
        <div class="justify-end ml-4">
          <Button key="back" @click="handleCancel">取消</Button>
          <Button key="submit" type="primary" @click="submitBackImageUrl">确定</Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
<script setup lang="ts">
  import { ref, defineProps, reactive } from 'vue';
  import {
    Modal,
    Button,
    Upload,
    Image,
    Pagination,
    Tabs,
    TabPane,
    TabsProps,
    RadioGroup,
    RadioButton,
    message as Message,
  } from 'ant-design-vue';
  import { UploadOutlined, SyncOutlined } from '@ant-design/icons-vue';
  import { ResponseCode, uploadBeforeImageValid } from '/@/utils';
  import { useUserStore } from '/@/store/modules/user';
  import { getImageCategoryList } from '/@/api/images/imageCategory';
  import { getImageList, uploadImage } from '/@/api/images/imageList';

  const props = defineProps({
    imageModal: {
      type: Object,
      default: () => {
        return {
          imageVisible: false,
          imageTitle: '选择图片',
          okText: '确定',
          width: '800px',
        };
      },
    },
  });
  const emit = defineEmits(['submitBackImageUrl']);
  // 分页配置
  const pagination = reactive({
    current: 1,
    pageSize: 12,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `共有图片${total}张`,
  });
  const pageChange = async (page, pageSize) => {
    const params = {
      current: page,
      pageSize: pageSize,
    };
    await initImageList(params);
  };
  // 取消弹窗
  const cancelHandleImageView = () => {
    const { imageModal } = props;
    imageModal.imageVisible = false;
  };
  // 提交返回的图片路径
  const submitBackImageUrl = () => {
    emit('submitBackImageUrl', backImageUrl.value);
    // 关闭弹窗
    const { imageModal } = props;
    imageModal.imageVisible = false;
  };
  // 提交上传自定义的显示文字
  const uploadText = ref<string>('图片大小不能超过4M');
  // 是否正在上传
  const isUploading = ref<boolean>(false);
  // 上传触发拦截
  const beforeUploadIntercept = ref<boolean>(false);
  // 上传之前的回调,这里做校验，校验图片的大小和类型
  const beforeUploadImage = async (file) => {
    const result = await uploadBeforeImageValid(file);
    beforeUploadIntercept.value = result;
    // 验证失败之后不会触发自定义上传
  };
  // 自定义上传图片
  const customRequestImage = async (file) => {
    isUploading.value = true;
    uploadText.value = '图片正在上传中...';
    const params = {
      original: 'article',
      imageCategoryId: imageCategoryKey.value ? imageCategoryKey.value : null,
      file: file,
    };
    if (!beforeUploadIntercept.value) return;
    const { data } = await uploadImage(params);
    if (data.code === ResponseCode.SUCCESS) {
      //上传成功
      Message.success(data.message);
      isUploading.value = false;
      uploadText.value = '图片大小不能超过4M';
      // 刷新图片列表
      const params = {
        ...pagination,
        categoryId: imageCategoryKey.value,
      };
      await initImageList(params);
    } else {
      Message.error(data.message);
    }
  };
  // 获取用户信息
  const userStore = useUserStore();
  // tabs
  const tabPosition = ref<TabsProps['tabPosition']>('left');
  const imageCategoryKey = ref(undefined);
  // tabs的value
  const changeImageCategoryValue = async (activeKey) => {
    // 将获取的用户图片分类列表给传递出去
    imageCategoryKey.value = activeKey;
    // 触发图片页面搜索
    const params = {
      ...pagination,
      categoryId: activeKey,
    };
    await initImageList(params);
  };
  const page = reactive({
    page: 1,
    size: 100,
  });
  // 图片分类
  const imageCategoryItem = ref([{ id: '', categoryName: '' }]);
  // 初始化图片标签分类
  const initImageCategoryTable = async (data) => {
    const userId = userStore.getUserInfo.id;
    const params = {
      page: data.page,
      size: data.size,
      userId: userId,
    };
    const firstCategory = {
      id: undefined,
      categoryName: '全部图片',
    };
    const result = await getImageCategoryList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents, currentPage, pageSize } = result.result;
      imageCategoryItem.value = contents;
      // 头部插入值
      imageCategoryItem.value.unshift(firstCategory);
      page.page = currentPage;
      page.size = pageSize;
    }
  };
  initImageCategoryTable(page);
  const selectIndexImage = ref('1');
  // 图片列表
  const ImageList = ref([
    {
      url: '',
      name: '',
    },
  ]);
  const initImageList = async (data) => {
    const params = {
      page: data.current,
      size: data.pageSize,
      categoryId: data.categoryId !== undefined ? data.categoryId : null,
      userId: data.userId ? data.userId : null,
    };
    const result = await getImageList(params);
    if (result.code === ResponseCode.SUCCESS) {
      const { contents, currentPage, pageSize, totalCount } = result.result;
      ImageList.value = contents;
      pagination.current = currentPage;
      pagination.pageSize = pageSize;
      pagination.total = totalCount;
    }
  };
  initImageList(pagination);
  // 取消弹窗
  const handleCancel = () => {
    const { imageModal } = props;
    imageModal.imageVisible = false;
  };
  // 返回图片的url
  const backImageUrl = ref<string>('');
  // 选中imageUrl
  const checkImage = (data) => {
    backImageUrl.value = data.url;
  };
</script>
<style lang="less" scoped>
  :deep(.ant-radio-button-wrapper) {
    padding: 1px;
  }
</style>

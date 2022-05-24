<!--
 * @Author: bugdr
 * @Date: 2022-05-24 16:43:42
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-25 00:02:54
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
    @ok="submitBackImageUrl"
  >
    <div class="md: flex w-full p-4">
      <div class="md:w-1/5 md:flex flex-col items-center border-r-1 border-black md:mx-2">
        <Tabs
          v-model:activeKey="activeKey"
          :tab-position="tabPosition"
          :tabBarGutter="6"
          type="card"
          :style="{ height: '460px' }"
          @tabClick="tabClickCategory"
        >
          <TabPane v-for="item in imageCategoryItem" :key="item.id" :tab="item.categoryName" />
        </Tabs>
      </div>
      <div class="md:w-4/5 md:flex flex-col">
        <div class="md:flex items-center">
          <Upload name="file" :customRequest="customRequestImage" :beforeUpload="beforeUploadImage">
            <Button>
              <UploadOutlined />
              上传图片</Button
            >
          </Upload>
          <span class="ml-2 text-base text-gray-400">图片大小不能超过4M</span>
        </div>
        <div class="mt-4 grid gap-1 md:gap-2 grid-cols-4">
          <RadioGroup
            v-model:value="selectIndexImage"
            v-for="(item, index) in ImageList"
            :key="index"
          >
            <RadioButton :autofocus="true" :value="item" class="w-48 h-48">
              <Image style="width: 100%" :preview="false" :src="item.url" :alt="item.name" />
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
        <div class="justify-end">
          <Button key="back" @click="handleCancel">取消</Button>
          <Button key="submit" type="primary" :loading="loading" @click="handleOk">确定</Button>
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
  } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { ResponseCode, uploadBeforeImageValid } from '/@/utils';
  import { useUserStore } from '/@/store/modules/user';
  import { getImageCategoryList } from '/@/api/images/imageCategory';
  import { getImageList } from '/@/api/images/imageList';

  // TODO:图片列表的编写
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
  const pagination = reactive({
    current: 1,
    pageSize: 12,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `共有图片${total}张`,
  });
  const pageChange = (page, pageSize) => {};
  // 取消弹窗
  const cancelHandleImageView = () => {
    const { imageModal } = props;
    imageModal.imageVisible = false;
  };
  // 提交返回的图片路径
  const submitBackImageUrl = () => {};
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
  // 获取用户信息
  const userStore = useUserStore();
  // tabs
  const tabPosition = ref<TabsProps['tabPosition']>('left');
  const activeKey = ref(undefined);
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
  // 选中标签页
  const tabClickCategory = (e) => {
    console.log('e :>> ', e);
  };
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
</script>
<style lang="less" scoped></style>

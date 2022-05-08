<!--
 * @Author: bugdr
 * @Date: 2022-05-07 14:45:02
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-08 10:14:15
 * @FilePath: \blog-admin\src\views\user\userList\components\UserListModal.vue
 * @Description: 弹窗
-->
<template>
  <div>
    <Modal :visible="userModal.isShowModal" :closable="false">
      <template #title>
        {{ userModal.title }}
      </template>
      <div class="m-4">
        <slot></slot>
      </div>
      <template #footer>
        <Button key="back" @click="handleCancel">{{ userModal.cancelText }}</Button>
        <Button key="submit" :loading="loading" type="primary" @click="handleConfirm">{{
          userModal.okText
        }}</Button>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue';
  import { Modal, Button } from 'ant-design-vue';
  const props = defineProps({
    userModal: {
      type: Object,
      default: () => {
        return {
          isShowModal: false,
          title: '',
          cancelText: '',
          okText: '',
        };
      },
    },
  });
  const loading = ref<boolean>(false);
  // 自定义事件
  const emit = defineEmits(['handleConfirm']);
  // 事件分发
  const handleConfirm = () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      emit('handleConfirm');
    }, 2000);
  };
  // 取消弹窗
  const handleCancel = () => {
    const { userModal } = props;
    userModal.isShowModal = false;
  };
  // 暴露方法
  defineExpose({
    handleCancel,
  });
</script>
<style lang="less" scoped></style>

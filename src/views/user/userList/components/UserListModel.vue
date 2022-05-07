<template>
  <div>
    <Modal :visible="userModal.isShowModal">
      <template #title>
        {{ userModal.title }}
      </template>
      <slot></slot>
      <template #footer>
        <Button key="back" @click="handleCancel">{{ userModal.cancelText }}</Button>
        <Button key="submit" type="primary" @click="handleConfirm">{{ userModal.okText }}</Button>
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
  console.log('userModal :>> ', props.userModal);
  // 自定义事件
  const emit = defineEmits(['handleCancel', 'handleConfirm']);
  // 事件分发
  const handleConfirm = () => {
    emit('handleConfirm');
  };
  const handleCancel = () => {
    emit('handleCancel');
  };
</script>
<style lang="less" scoped></style>

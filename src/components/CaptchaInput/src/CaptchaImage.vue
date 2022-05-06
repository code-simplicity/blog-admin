<!--
 * @Author: bugdr
 * @Date: 2022-05-03 12:25:01
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-06 09:37:11
 * @FilePath: \blog-admin\src\components\CaptchaInput\src\CaptchaImage.vue
 * @Description: 验证码图片
-->
<template>
  <img :src="captchaValue" class="cursor-pointer" @click="changeVerifyCode" />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { CaptchaApi } from '/@/api/sys/captcha';
  export default defineComponent({
    name: 'CaptchaImage',
    emits: ['changeVerifyCode'],
    setup(props, content) {
      const captchaValue = ref('');
      async function getCaptchaImage() {
        captchaValue.value = `${CaptchaApi.GetCaptcha}`;
      }
      getCaptchaImage();
      // 切换验证码
      async function changeVerifyCode() {
        const isDate = String(new Date()); // 时间类型格式化
        captchaValue.value = `${CaptchaApi.GetCaptcha}?random=${Date.parse(isDate)}`;
        content.emit('changeVerifyCode');
      }
      return {
        captchaValue,
        changeVerifyCode,
      };
    },
  });
</script>
<style lang="less" scoped></style>

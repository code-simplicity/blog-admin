<!--
 * @Author: bugdr
 * @Date: 2022-05-02 14:03:13
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-06 09:46:47
 * @FilePath: \blog-admin\src\views\sys\login\ForgetPasswordForm.vue
 * @Description: 重置密码
-->
<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="email" class="enter-x">
        <Input size="large" v-model:value="formData.email" :placeholder="t('sys.login.email')" />
      </FormItem>
      <FormItem name="captcha_code" class="enter-x">
        <Row justify="space-between" :gutter="12">
          <Col :span="16">
            <Input
              size="large"
              v-model:value="formData.captcha_code"
              :placeholder="t('sys.login.captchaPlaceholder')"
            />
          </Col>
          <Col :span="8">
            <CaptchaImage ref="captchaRef" />
          </Col>
        </Row>
      </FormItem>
      <FormItem name="email_code" class="enter-x">
        <Input
          :class="prefixCls"
          size="large"
          v-model:value="formData.email_code"
          :placeholder="t('sys.login.emailCode')"
        >
          <template #addonAfter>
            <Button
              size="large"
              :disabled="isStart"
              @click="handleStart"
              :loading="loadingSendEmail"
              >{{ getButtonText }}</Button
            >
          </template>
        </Input>
      </FormItem>
      <FormItem name="password" class="enter-x">
        <InputPassword
          size="large"
          name="password"
          v-model:value="formData.password"
          :placeholder="t('sys.login.passwordPlaceholder')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, InputPassword, message as Message, Row, Col } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { useCountDown } from './useCountdown';
  import { useDesign } from '/@/hooks/web/useDesign';
  import CaptchaImage from '/@/components/CaptchaInput/src/CaptchaImage.vue';
  import { resetPassword, sendEmailCode } from '/@/api/sys/user';
  import { ResponseCode } from '/@/utils';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    email: '',
    email_code: '',
    password: '',
    captcha_code: '',
  });

  // 倒计时时间
  const count = ref(60);
  // 发送验证码的加载状态
  let loadingSendEmail = ref(false);
  // 获取倒计时的函数
  const { isStart, currentCount, start } = useCountDown(count.value);

  // 按钮样式
  const { prefixCls } = useDesign('countdown-input');

  // 计算button出现的文字
  const getButtonText = computed(() => {
    return !unref(isStart)
      ? t('component.countdown.normalText')
      : t('component.countdown.sendText', [unref(currentCount)]);
  });

  // 发送邮箱验证码
  async function handleStart() {
    if (!formData.email || !formData.captcha_code) {
      return Message.warning('邮箱/图灵验证码不可以为空');
    }
    // 验证邮箱格式
    const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!reg.test(formData.email)) {
      return Message.warning('邮箱格式不正确');
    }
    // 填充参数
    const params = {
      email: formData.email,
      captcha_code: formData.captcha_code,
      type: 'forget', // 类型为forget，忘记密码
    };
    loadingSendEmail.value = true;
    try {
      const result = await sendEmailCode(params);
      if (result.code === ResponseCode.SUCCESS) {
        // 发送成功
        Message.success(result.message);
        // 不管发送成功还是失败都是要等到60s以后再执行
        start();
      } else {
        // 发送失败
        Message.error(result.message);
      }
    } finally {
      loadingSendEmail.value = false;
    }
  }

  // 触发验证码更新
  const captchaRef = ref<any>(null);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);
  // 表单验证
  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);
  // 重置密码
  async function handleReset() {
    // 表单验证返回值
    const form = unref(formRef);
    const data = await validForm();
    if (!data) return;
    // 重置密码
    const result = await resetPassword(data);
    if (result.code === ResponseCode.SUCCESS) {
      Message.success(result.message);
      // 清除表单
      await form.resetFields();
    } else {
      // 失败
      // 更新验证码
      captchaRef.value.changeVerifyCode();
      Message.error(result.message);
    }
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      background-color: transparent;
      border: none;

      button {
        font-size: 14px;
      }
    }
  }
</style>

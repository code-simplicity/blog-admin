<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="userName" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.userName"
          :placeholder="t('sys.login.registerUserName')"
        />
      </FormItem>
      <FormItem name="email" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.email"
          :placeholder="t('sys.login.registerEmail')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="captcha_code" class="enter-x">
        <Row justify="space-between" :gutter="12">
          <Col :span="16">
            <Input
              size="large"
              v-model:value="formData.captcha_code"
              :placeholder="t('sys.login.captchaPlaceholder')"
              class="fix-auto-fill"
            />
          </Col>
          <Col :span="8">
            <CaptchaImage />
          </Col>
        </Row>
      </FormItem>
      <FormItem name="email_code" class="enter-x">
        <Input
          :class="prefixCls"
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.email_code"
          :placeholder="t('sys.login.registerEmailCode')"
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
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox, Row, Col, message } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { doRegister, sendEmailCode } from '/@/api/sys/user';
  import { useCountDown } from './useCountdown';
  import { ResponseCode } from '/@/utils';
  import { useDesign } from '/@/hooks/web/useDesign';
  import CaptchaImage from '/@/components/CaptchaInput/src/CaptchaImage.vue';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    userName: '',
    password: '',
    email: '',
    email_code: '',
    captcha_code: '',
    policy: false,
  });

  // 自定义获取邮箱验证码的按钮事件
  let count = ref(60);
  // 发送验证码的加载状态
  let loadingSendEmail = ref(false);
  // 传递倒计时给倒计时处理函数
  const { currentCount, isStart, start } = useCountDown(count.value);
  // 计算button出现的文字
  const getButtonText = computed(() => {
    return !unref(isStart)
      ? t('component.countdown.normalText')
      : t('component.countdown.sendText', [unref(currentCount)]);
  });
  // 按钮样式
  const { prefixCls } = useDesign('countdown-input');
  // 控制发送按钮
  async function handleStart() {
    // 首先判断用邮箱和验证码不为空才可以发送邮箱验证
    if (!formData.email || !formData.captcha_code) {
      return message.warning('邮箱和图灵验证码不可以为空');
    }
    // 验证邮箱格式
    // 邮箱验证正则表达式
    const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!reg.test(formData.email)) {
      return message.warning('邮箱格式不正确');
    }
    // 填充参数
    const params = {
      email: formData.email,
      captcha_code: formData.captcha_code,
      type: 'register', // 类型，默认值为register
    };
    loadingSendEmail.value = true;
    try {
      const result = await sendEmailCode(params);
      if (result.code === ResponseCode.SUCCESS) {
        // 发送成功
        message.success(result.message);
        // 不管发送成功还是失败都是要等到60s以后再执行
        start();
      } else {
        // 发送失败
        message.error(result.message);
      }
    } finally {
      loadingSendEmail.value = false;
    }
  }
  // 表单验证
  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);
  let getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);
  // 注册实现
  async function handleRegister() {
    // 验证表单返回值
    const { policy, ...data } = await validForm();
    const form = unref(formRef);
    if (!data) return;
    const result = await doRegister(data);
    if (result.code === ResponseCode.JOIN_IN_SUCCESS) {
      // 注册成功，提示是否需要跳转到登录界面
      // 提示注册成功
      message.success(result.message);
      // 清除表单
      await form.resetFields();
    } else {
      message.error(result.message);
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

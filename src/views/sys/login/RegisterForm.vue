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
            <img :src="captchaValue" class="cursor-pointer" @click="changeVerifyCode"
          /></Col>
        </Row>
      </FormItem>
      <FormItem name="email_code" class="enter-x">
        <Row justify="space-between" :gutter="6">
          <Col :span="16">
            <Input
              size="large"
              class="fix-auto-fill"
              v-model:value="formData.email_code"
              :placeholder="t('sys.login.registerEmailCode')"
            />
          </Col>
          <Col :span="8">
            <Button
              size="large"
              :disabled="isStart"
              @click="handleStart"
              :loading="loadingSendEmail"
              >{{ getButtonText }}</Button
            >
          </Col>
        </Row>
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
  import { CaptchaApi } from '/@/api/sys/captcha';
  import { useCountDown } from './useCountdown';
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

  // 获取验证码
  const captchaValue = ref('');
  async function getCaptchaImage() {
    captchaValue.value = `${CaptchaApi.GetCaptcha}`;
  }
  getCaptchaImage();
  // 切换验证码
  async function changeVerifyCode() {
    const isDate = String(new Date()); // 时间类型格式化
    captchaValue.value = `${CaptchaApi.GetCaptcha}?random=${Date.parse(isDate)}`;
  }

  // TODO: 自定义获取邮箱验证码的按钮事件
  let count = ref(60);
  // 发送验证码的加载状态
  let loadingSendEmail = ref(false);
  // 传递倒计时给倒计时处理函数
  const { currentCount, isStart, start, reset } = useCountDown(count.value);
  const getButtonText = computed(() => {
    return !unref(isStart)
      ? t('component.countdown.normalText')
      : t('component.countdown.sendText', [unref(currentCount)]);
  });
  // 控制发送按钮
  async function handleStart() {
    if (formData.email === null && formData.email_code === null) {
      return;
    }
    loadingSendEmail.value = true;
    // 填充参数
    const params = {
      email: formData.email,
      captcha_code: formData.captcha_code,
      type: 'register', // 类型，默认值为register
    };
    const result = await sendEmailCode(params);
    // 不管发送成功还是失败都是要等到60s以后再执行
    start();
    if (result.code === 20000) {
      // 发送成功
      loadingSendEmail.value = false;
    } else {
      // 发送失败
      // 提示信息
      message.error(result.message);
      loadingSendEmail.value = false;
    }
  }

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    const result = await doRegister(data);
    console.log(data);
  }
</script>

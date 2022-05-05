<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="userName" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.userName"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      >
        <template #prefix>
          <UserOutlined />
        </template>
      </Input>
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      >
        <template #prefix>
          <LockOutlined />
        </template>
      </InputPassword>
    </FormItem>

    <FormItem name="captcha" class="enter-x">
      <Row flex justify="space-between" :gutter="12">
        <Col :span="16">
          <Input
            size="large"
            v-model:value="formData.captcha"
            :placeholder="t('sys.login.captcha')"
            class="fix-auto-fill"
          >
            <template #prefix>
              <KeyOutlined />
            </template>
          </Input>
        </Col>
        <Col :span="8">
          <CaptchaImage />
        </Col>
      </Row>
    </FormItem>

    <Row class="enter-x">
      <Col :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </Col>
    </Row>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>
    <Row class="enter-x">
      <Col :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </Col>
      <Col :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </Col>
      <Col :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </Col>
    </Row>

    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
    KeyOutlined,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import CaptchaImage from '/@/components/CaptchaInput/src/CaptchaImage.vue';
  import { ResponseCode } from '/@/utils';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const formData = reactive({
    userName: 'bugdr',
    password: '123456',
    captcha: '',
  });

  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const result = await userStore.login({
        password: data.password,
        userName: data.userName,
        captcha: data.captcha,
        mode: 'none', //不要默认的错误提示
      });
      // 做一下判空
      if (result === null) return;
      if (result.code === ResponseCode.SUCCESS) {
        notification.success({
          message: result.message,
          description: `${t('sys.login.loginSuccessDesc')}: ${result.result.userName}`,
          duration: 3,
        });
      } else {
        notification.error({
          message: result.message,
          duration: 3,
        });
      }
    } finally {
      loading.value = false;
    }
  }
</script>

import type { ValidationRule } from 'ant-design-vue/es/form/Form';
import type { RuleObject } from 'ant-design-vue/lib/form/interface';
import { ref, computed, unref, Ref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

// 验证规则
export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();

  const getUserNameFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')));
  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')));
  const getEmailFormRule = computed(() => createRule(t('sys.login.emailPlaceholder')));
  const getEmailCodeRule = computed(() => createRule(t('sys.login.emailCodePlaceholder')));
  const getMobileFormRule = computed(() => createRule(t('sys.login.mobilePlaceholder')));
  const getCaptchaFormRule = computed(() => createRule(t('sys.login.captchaPlaceholder')));

  const validatePolicy = async (_: RuleObject, value: boolean) => {
    return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve();
  };

  const validateConfirmPassword = (password: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('sys.login.passwordPlaceholder'));
      }
      if (value !== password) {
        return Promise.reject(t('sys.login.diffPwd'));
      }
      return Promise.resolve();
    };
  };

  // 验证验证码
  const validateConfirmCaptcha = (captcha: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('sys.login.captchaPlaceholder'));
      }
      if (value !== captcha) {
        return Promise.reject(t('sys.login.diffCaptcha'));
      }
      return Promise.resolve();
    };
  };

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const userNameFormRule = unref(getUserNameFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const mobileFormRule = unref(getMobileFormRule);
    const captchaFormRule = unref(getCaptchaFormRule);
    const emailFormRule = unref(getEmailFormRule);
    const emailCodeFormRule = unref(getEmailCodeRule);

    const mobileRule = {
      mobile: mobileFormRule,
    };
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          userName: userNameFormRule,
          password: passwordFormRule,
          captcha: captchaFormRule,
          email: emailFormRule,
          email_code: emailCodeFormRule,
          captcha_code: captchaFormRule,
          policy: [{ validator: validatePolicy, trigger: 'change' }],
          ...mobileRule,
        };

      // 重置密码的规则
      case LoginStateEnum.RESET_PASSWORD:
        return {
          password: passwordFormRule,
          email: emailFormRule,
          email_code: emailCodeFormRule,
          captcha_code: captchaFormRule,
          ...mobileRule,
        };

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return mobileRule;

      // login form rules
      default:
        return {
          userName: userNameFormRule,
          password: passwordFormRule,
          captcha: captchaFormRule,
        };
    }
  });
  return { getFormRules };
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}

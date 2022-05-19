/*
 * @Author: bugdr
 * @Date: 2022-05-19 12:54:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 13:09:26
 * @FilePath: \blog-admin\src\views\operation\looperManage\components\looperManage.ts
 * @Description:轮播图表单验证
 */
import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import { computed, Ref, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

// 验证规则的返回
export function looperFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }
  return { validForm };
}

// 验证规则
export function looperFormRules() {
  const { t } = useI18n();

  const getLooperTitleFormRule = computed(() => createRule(t('sys.looper.titlePlaceholder')));
  const getLooperTargetUrlFormRule = computed(() =>
    createRule(t('sys.looper.targetUrlPlaceholder')),
  );
  const getLooperOrderFormRule = computed(() => createRule(t('sys.looper.orderPlaceholder')));
  const getLooperStateFormRule = computed(() => createRule(t('sys.looper.statePlaceholder')));
  const getLooperImageUrlFormRule = computed(() => createRule(t('sys.looper.imageUrlPlaceholder')));

  // 获取表单验证规则
  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    // 解构
    const looperTitleFormRule = unref(getLooperTitleFormRule);
    const looperTargetUrlFormRule = unref(getLooperTargetUrlFormRule);
    const looperOrderFormRule = unref(getLooperOrderFormRule);
    const looperStateFormRule = unref(getLooperStateFormRule);
    const looperImageUrlFormRule = unref(getLooperImageUrlFormRule);
    return {
      title: looperTitleFormRule,
      order: looperOrderFormRule,
      state: looperStateFormRule,
      targetUrl: looperTargetUrlFormRule,
      imageUrl: looperImageUrlFormRule,
    };
  });
  return { getFormRules };
}

// 创建弹出规则
function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}

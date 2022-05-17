/*
 * @Author: bugdr
 * @Date: 2022-05-17 12:52:14
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-17 13:30:41
 * @FilePath: \blog-admin\src\views\operation\categoryManage\categoryManage.ts
 * @Description:验证规则
 */

import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import { computed, Ref, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

// 验证规则的返回
export function categoryFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }
  return { validForm };
}

// 验证规则
export function categoryFormRules() {
  const { t } = useI18n();

  const getCategoryNameFormRule = computed(() => createRule(t('sys.category.namePlaceholder')));
  const getCategoryPinYinFormRule = computed(() => createRule(t('sys.category.pinyinPlaceholder')));
  const getCategoryOrderFormRule = computed(() => createRule(t('sys.category.orderPlaceholder')));
  const getCategoryStatusFormRule = computed(() => createRule(t('sys.category.statusPlaceholder')));
  const getCategoryDescriptionFormRule = computed(() =>
    createRule(t('sys.category.descriptionPlaceholder')),
  );

  // 获取表单验证规则
  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    // 解构
    const categoryNameFormRule = unref(getCategoryNameFormRule);
    const categoryPinYinFormRule = unref(getCategoryPinYinFormRule);
    const categoryOrderFormRule = unref(getCategoryOrderFormRule);
    const categoryStatusFormRule = unref(getCategoryStatusFormRule);
    const categoryDescriptionFormRule = unref(getCategoryDescriptionFormRule);
    return {
      name: categoryNameFormRule,
      pinyin: categoryPinYinFormRule,
      order: categoryOrderFormRule,
      status: categoryStatusFormRule,
      description: categoryDescriptionFormRule,
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

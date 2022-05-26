/*
 * @Author: bugdr
 * @Date: 2022-05-24 15:45:45
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-26 10:33:08
 * @FilePath: \blog-admin\src\views\article\components\articleForm.ts
 * @Description:文章表单的验证规则
 */

import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import { computed, Ref, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

// 验证规则的返回
export function articleFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }
  return { validForm };
}

// 验证规则
export function articleFormRules() {
  const { t } = useI18n();

  const getArticleCategoryIdFormRule = computed(() => createRule(t('sys.article.categoryId')));
  const getArticleCoverFormRule = computed(() => createRule(t('sys.article.cover')));
  const getArticleSummaryFormRule = computed(() => createRule(t('sys.article.summary')));
  const getArticleLabelFormRule = computed(() => createRule(t('sys.article.label')));

  // 获取表单验证规则
  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    // 解构
    const ArticleCategoryIdFormRule = unref(getArticleCategoryIdFormRule);
    const ArticleCoverFormRule = unref(getArticleCoverFormRule);
    const ArticleSummaryFormRule = unref(getArticleSummaryFormRule);
    const ArticleLabelFormRule = unref(getArticleLabelFormRule);
    return {
      categoryId: ArticleCategoryIdFormRule,
      cover: ArticleCoverFormRule,
      summary: ArticleSummaryFormRule,
      labels: ArticleLabelFormRule,
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

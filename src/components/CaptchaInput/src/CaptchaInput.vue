<!--
 * @Author: bugdr
 * @Date: 2022-05-03 12:23:27
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-03 14:55:01
 * @FilePath: \blog-admin\src\components\CaptchaInput\src\CaptchaInput.vue
 * @Description: 输入框
-->
<template>
  <Row flex justify="space-between" :gutter="12">
    <Col :span="16">
      <a-input v-bind="$attrs" :class="prefixCls" :size="size" :value="state" />
    </Col>
    <Col :span="8"> <CaptchaImage /></Col>
  </Row>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useDesign } from '/@/hooks/web/useDesign';
  import CaptchaImage from './CaptchaImage.vue';
  import { Row, Col } from 'ant-design-vue';
  const props = {
    value: { type: String },
    size: { type: String, validator: (v) => ['default', 'large', 'small'].includes(v) },
  };
  export default defineComponent({
    name: 'CaptchaInput',
    components: { CaptchaImage, Row, Col },
    props,
    setup(props) {
      const { prefixCls } = useDesign('captcha-input');
      const [state] = useRuleFormItem(props);
      return { prefixCls, state };
    },
  });
</script>
<style lang="less" scoped></style>

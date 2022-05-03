/*
 * @Author: bugdr
 * @Date: 2022-05-03 11:06:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-03 13:45:01
 * @FilePath: \blog-admin\src\components\CaptchaInput\index.ts
 * @Description:图灵验证码输入框和验证码框
 */
import { withInstall } from '/@/utils';

import captchaInput from './src/CaptchaInput.vue';
import captchaImage from './src/CaptchaImage.vue';
export const CaptchaInput = withInstall(captchaInput);
export const CaptchaImage = withInstall(captchaImage);

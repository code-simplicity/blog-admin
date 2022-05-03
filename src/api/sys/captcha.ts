import { defHttp } from '/@/utils/http/axios';

/*
 * @Author: bugdr
 * @Date: 2022-05-03 13:26:45
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-03 16:04:37
 * @FilePath: \blog-admin\src\api\sys\captcha.ts
 * @Description:获取验证码
 */
const VITE_BASE_URL = import.meta.env.VITE_GLOB_API_URL;

// 发送验证码
export const CaptchaApi = {
  GetCaptcha: `${VITE_BASE_URL}/user/captcha`,
};

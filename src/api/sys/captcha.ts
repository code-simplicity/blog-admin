enum Api {
  CaptchaApi = '/user/captcha',
}

const VITE_BASE_URL = import.meta.env.VITE_GLOB_API_URL;
/**
 * 获取图灵验证
 * @returns
 */
export const CaptchaApi = {
  GetCaptcha: `${VITE_BASE_URL}${Api.CaptchaApi}`,
};

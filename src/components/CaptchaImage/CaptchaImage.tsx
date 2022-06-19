/*
 * @Author: bugdr
 * @Date: 2022-06-15 09:58:34
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 10:10:35
 * @FilePath: \react-blog-admin\src\components\CaptchaImage\CaptchaImage.tsx
 * @Description:验证码图片
 */

import { FC, useEffect, useState } from 'react';
import { CaptchaApi } from '../../api/sys/captcha';

const CaptchaImage: FC = () => {
  const [captchaValue, setCaptchaValue] = useState<string | undefined>();
  //  获取图片
  const getCaptchaImage = async () => {
    const result = `${CaptchaApi.GetCaptcha}`;
    setCaptchaValue(result);
  };

  // 改变验证码
  const changeVerifyCode = async () => {
    const isDate = String(new Date()); // 时间类型格式化
    const result = `${CaptchaApi.GetCaptcha}?random=${Date.parse(isDate)}`;
    setCaptchaValue(result);
  };

  useEffect(() => {
    getCaptchaImage();
    changeVerifyCode();
  }, [getCaptchaImage, changeVerifyCode]);

  return (
    <img
      className="cursor-pointer"
      src={captchaValue}
      alt="图灵验证码"
      onClick={changeVerifyCode}
    />
  );
};

export default CaptchaImage;

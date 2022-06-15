/*
 * @Author: bugdr
 * @Date: 2022-06-15 09:58:34
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 10:10:35
 * @FilePath: \react-blog-admin\src\components\CaptchaImage\CaptchaImage.tsx
 * @Description:验证码图片
 */

import { FC, useState } from 'react';

const CaptchaImage: FC = () => {
  const [captchaValue, setCaptchaValue] = useState<string | undefined>();
  const changeVerifyCode = async () => {
    setCaptchaValue('1');
  };
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

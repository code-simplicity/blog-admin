/*
 * @Author: bugdr
 * @Date: 2022-06-14 09:39:48
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-14 10:28:58
 * @FilePath: \react-blog-admin\src\components\App\AppLogo.tsx
 * @Description:login+名字
 */

import { FC } from 'react';
import Sys from '/@/locales/lang/zh-CN/sys';
import Logo from '/@/assets/svg/logo.svg';
const AppLogo: FC = () => {
  return (
    <div className="flex items-center">
      <img className="mr-2 w-8 h-8" src={Logo} alt="" />
      <span className="text-xl text-light-50">{Sys.app.appName}</span>
    </div>
  );
};

export default AppLogo;

/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:12:01
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-14 23:28:04
 * @FilePath: \react-blog-admin\src\views\sys\login\index.tsx
 * @Description:登录界面
 */
import React from 'react';
import AppLogo from '../../../components/App/AppLogo';
import LoginBoxBg from '/@/assets/svg/login-box-bg.svg';
import './index-modules.less';
const Login: React.FC = () => {
  return (
    <div className="relative w-full h-full px-4 dpy-login">
      <div className="absolute top-4 right-4">功能</div>
      {/* logo+名字 */}
      <span className="xl:hidden">
        <AppLogo />
      </span>
      <div className="container relative h-full mx-auto sm:px-10">
        <div className="flex -h-full">
          <div className="hidden min-h-full pl-4 mt-4 mr-4 xl:flex xl:flex-col xl:w-1/2">
            <AppLogo />
            <div className="my-auto">
              <img src={LoginBoxBg} alt="" className="w-full h-full" />
            </div>
            <div className="absolute z-0 bottom-24">
              <div className="text-white font-medium mt-10">
                <span className="mt-4 inline-block text-3xl">管理后台</span>
              </div>
              <div className="mt-4 font-normal text-white text-md dark:text-gray-500">
                博客后台管理系统
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-items-center">1</div> */}
    </div>
  );
};

export default Login;

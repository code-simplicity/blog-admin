/*
 * @Author: bugdr
 * @Date: 2022-06-15 09:01:11
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 09:42:49
 * @FilePath: \react-blog-admin\src\views\sys\login\useLogin.ts
 * @Description:用户登录的一些状态和表单的验证
 */
import { useMemo, useState } from 'react';

export enum LoginStateEnum {
  LOGIN, // 登录
  REGISTER, // 注册
  RESET_PASSWORD, // 重置密码
  MOBILE, // 移动端
  QR_CODE, // 验证码
}

// 当前的state

export function useLoginState() {
  const [currentState, setCurrentState] = useState(LoginStateEnum.LOGIN);

  function setLoginState(state: LoginStateEnum) {
    setCurrentState(state);
  }

  const getLoginState = useMemo(() => {
    return currentState;
  }, [currentState]);

  // 返回登录
  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }
  return {
    setLoginState,
    getLoginState,
    handleBackLogin,
  };
}

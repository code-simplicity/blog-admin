/*
 * @Author: bugdr
 * @Date: 2022-06-15 08:39:53
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 09:43:15
 * @FilePath: \react-blog-admin\src\views\sys\login\LoginFormTitle.tsx
 * @Description:表单的title
 */

import { FC, useMemo } from 'react';
import { LoginStateEnum, useLoginState } from './useLogin';
const LoginFormTitle: FC = () => {
  const { getLoginState } = useLoginState();
  // 计算属性计算title
  const getFormTitle = useMemo(() => {
    const titleObj = {
      [LoginStateEnum.LOGIN]: '登录',
    };
    return titleObj[getLoginState];
  }, []);
  return (
    <h2 className="mb-3 text-2xl font-bold text-center xl:text-3xl xl:text-left">{getFormTitle}</h2>
  );
};

export default LoginFormTitle;

/*
 * @Author: bugdr
 * @Date: 2022-06-19 13:00:13
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-19 13:44:14
 * @FilePath: \react-blog-admin\src\store\modules\user.ts
 * @Description:用户的store
 */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '/@/store';
import { UserInfo } from '/#/store';

// 用户接口类型约束
export interface UserState {
  UserInfo: UserInfo;
  Token: string;
}

// 初始化用户state
const initialState: UserState = {
  UserInfo: {
    // 用户id
    id: '',
    // 用户角色
    roles: [],
    // 用户名
    userName: '',
    // 邮箱
    email: '',
    // 头像
    avatar: '',
    // 注册ip
    regIp: '',
    // 签名
    sign: '',
    // 状态
    state: '',
    homePath: '',
  },
  Token: '',
};

// 用户的modules
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 触发用户更新的方法
    setUserInfo(state, action) {
      state.UserInfo = action.payload;
    },
    // 触发用户token保存的方法
    setToken(state, action) {
      state.Token = action.payload;
    },
  },
});

// actions结构出相关方法
export const { setUserInfo, setToken } = userSlice.actions;

// 选择用户数据
export const selectUserInfo = (state: RootState) => {
  state.user.UserInfo;
};

export default userSlice.reducer;

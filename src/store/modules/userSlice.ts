/*
 * @Author: bugdr
 * @Date: 2022-06-19 13:00:13
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-03 21:38:22
 * @FilePath: \react-blog-admin\src\store\modules\userSlice.ts
 * @Description:用户的store
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '/@/store';
import { UserInfo } from '/#/store';
import { getUserInfo, logout } from '/@/api/user/user';
import { ResponseCode } from '/@/utils/response';
import { notification } from 'antd';

// 获取用户信息
export const checkUserInfoByToken: any = createAsyncThunk('/user/login', async () => {
  const { result, code, message } = await getUserInfo();
  if (code === ResponseCode.SUCCESS) {
    // 登录成功
    notification.success({
      message: message,
      description: `欢迎回来：${result.userName}`,
      duration: 3,
    });
    // 返回成功的值
    return result;
  } else {
    // 登录失败
    notification.error({
      message: message,
      description: `还没有登录`,
      duration: 3,
    });
    return result;
  }
});

// 退出登录
export const doLogout: any = createAsyncThunk('/user/logout', async () => {
  const { code, message } = await logout();
  if (code === ResponseCode.SUCCESS) {
    // 退出登录成
    notification.success({
      message: message,
      duration: 3,
    });
  } else {
    // 退出登录失败
    notification.error({
      message: message,
      duration: 3,
    });
  }
});

// 用户接口类型约束
export interface UserState {
  UserInfo: UserInfo | null;
  Token: null;
}

// 初始化用户state
const initialState: UserState = {
  UserInfo: null,
  Token: null,
};

// 用户的modules
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 触发用户token保存的方法
    setToken(state, action) {
      state.Token = action.payload;
    },
    clearToken: (state) => {
      state.Token = null;
    },
  },
  extraReducers: (builder) => {
    // 异步触发获取用户信息
    builder.addCase(checkUserInfoByToken.fulfilled, (state, action) => {
      state.UserInfo = action.payload;
    });
    // 退出登录
    builder.addCase(doLogout.fulfilled, (state) => {
      // 将用户信息清除，清除token
      state.UserInfo = null;
      state.Token = null;
    });
  },
});

// actions结构出相关方法
export const { setToken } = userSlice.actions;

// 选择用户数据
export const selectUserInfo = (state: RootState) => {
  state.user.UserInfo;
};

export default userSlice.reducer;

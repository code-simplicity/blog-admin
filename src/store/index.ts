/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:07:55
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-19 13:52:49
 * @FilePath: \react-blog-admin\src\store\index.ts
 * @Description:创建store
 */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promiseMiddleware from 'redux-promise';
import userReducer from '/@/store/modules/user';

// 持久化配置
const persistConfig = {
  key: 'root',
  storage,
};

// 配置reducers
const reducers = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// 创建store
export const store = configureStore({
  reducer: persistedReducer,
  // 中间件
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([promiseMiddleware]),
});

export const persister = persistStore(store);

// 根root状态
export type RootState = ReturnType<typeof store.getState>;

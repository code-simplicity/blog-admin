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
import appSlice from './modules/appSlice';
import userSlice from './modules/userSlice';

// 持久化配置，不再直接采用localStorage来缓存，刷新页面之后状态也不会消失
const persistConfig = {
  key: 'root',
  storage,
};

// 配置多个reducers，通过这个组合的hooks
const reducers = combineReducers({
  user: userSlice,
  app: appSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// 配置Store
export const store = configureStore({
  reducer: persistedReducer,
  // 中间件，实现网络请求，异步操作，中间件等
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([promiseMiddleware]),
});

// 持久存储Store
export const persister = persistStore(store);

// 根root状态，并且导出
export type RootState = ReturnType<typeof store.getState>;

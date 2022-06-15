/*
 * @Author: bugdr
 * @Date: 2022-06-15 13:12:53
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 14:48:35
 * @FilePath: \react-blog-admin\src\utils\http\AxiosTransform.ts
 * @Description:axios转换
 */

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '/#/axios';

// axios配置
export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string; // 身份验证方案
  transform?: AxiosTransform; // 转换
  requestOptions?: RequestOptions; // 请求的配置项
}

export abstract class AxiosTransform {
  // 请求之前的钩子
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  // 转换请求
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  // 请求失败处理
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  // 请求之前的拦截
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig;

  // 请求之后的拦截器
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  // 请求之前的拦截器错误处理
  requestInterceptorsCatch?: (error: Error) => void;

  // 请求之后的拦截器错误处理
  responseInterceptorsCatch?: (error: Error) => void;
}

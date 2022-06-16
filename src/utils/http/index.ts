/*
 * @Author: bugdr
 * @Date: 2022-06-15 16:01:39
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 16:54:34
 * @FilePath: \react-blog-admin\src\utils\http\index.ts
 * @Description:配置http
 */

import { ContentTypeEnum, RequestEnum, ResultEnum } from '../enums/httpEnum';
import { DAxios } from './Axios';
import { AxiosTransform, CreateAxiosOptions } from './AxiosTransform';
import { deepMerge, setObjToUrlParams } from '../index';
import { AxiosResponse } from 'axios';
import { isString } from 'lodash-es';
import type { RequestOptions, Result } from '/#/axios';
import { useMessage } from '../../hooks/web/useMessage';
import { formatRequestDate, joinTimestamp } from './helper';
import { checkStatus } from './CheckStatus';
import { useGlobSetting } from '../../hooks/setting';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;

const { createMessage, createErrorModal } = useMessage();

const transform: AxiosTransform = {
  /**
   * 处理请求数据。如果数据不是预期格式，可直接抛出错误
   * @param res
   * @param options
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回
    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求出错');
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    // 解构字段
    const { code, message, result } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data || (Reflect.has(data, 'code') && code === ResultEnum.SUCCESS);
    if (hasSuccess) {
      return data;
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = '请求超时';
        // const userStore = useUserStoreWithOut();
        // userStore.setToken(undefined);
        // userStore.logout(true);
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: '错误提示', content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || '请求出错，请稍后重试');
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;
    const configKey = config;
    // 连接
    if (joinPrefix) {
      configKey.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      configKey.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        configKey.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        configKey.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        configKey.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          configKey.data = data;
          configKey.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          configKey.data = params;
          configKey.params = undefined;
        }
        if (joinParamsToUrl) {
          configKey.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        configKey.url = config.url + params;
        configKey.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    // const token = getToken();
    // if (token && config?.requestOptions?.withToken !== false) {
    //   // jwt token
    //   config.headers.Authorization = options.authenticationScheme
    //     ? `${options.authenticationScheme} ${token}`
    //     : token;
    // }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时，请刷新页面重试';
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查你的网络是否连接正常';
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: '错误提示', content: errMessage });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(error?.response?.status, msg, errorMessageMode);
    return Promise.reject(error);
  },
};
/**
 * 创建axios请求
 * @param options
 * @returns
 */
function createAxios(options?: Partial<CreateAxiosOptions>) {
  return new DAxios(
    deepMerge(
      {
        // 身份证验证方案
        authenticationScheme: '',
        timeout: 10 * 100000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      options || {},
    ),
  );
}

export const defHttp = createAxios();

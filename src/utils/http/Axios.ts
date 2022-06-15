/*
 * @Author: bugdr
 * @Date: 2022-06-15 12:04:13
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 14:36:59
 * @FilePath: \react-blog-admin\src\utils\http\Axios.ts
 * @Description:axios请求库
 */
import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { CreateAxiosOptions } from './AxiosTransform';
import { AxiosCanceler } from './AxiosCanceler';
import { isFunction } from '../is';
import { ContentTypeEnum, RequestEnum } from '../enums/httpEnum';
import qs from 'qs';
import type { RequestOptions, Result, UploadFileParams } from '/#/axios';
import { cloneDeep } from 'lodash-es';

export class DAxios {
  private axiosInstance: AxiosInstance; // axios实例
  private readonly options: CreateAxiosOptions; // 配置项

  // 构造器
  constructor(options: CreateAxiosOptions) {
    this.options = options; // 配置项目
    this.axiosInstance = axios.create(options); // 创建实例
    this.setupInterceptors(); // 设置拦截器
  }

  // 创建axios
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  // 获取转换
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios() {
    return this.axiosInstance;
  }

  // configAxios配置
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) return;
    this.createAxios(config);
  }

  setHeader(headers: any): void {
    if (!this.axiosInstance) return;
    // 拷贝
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  // 设置拦截器
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) return;
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        headers: { ignoreCancelToken },
      } = config;

      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;
      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        // eslint-disable-next-line no-param-reassign
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    // 请求错误
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 响应
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // 响应异常
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  // 文件上传
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams): any {
    const formData = new FormData();
    const customFilename = params.name || 'file';
    formData.append(customFilename, params.file);
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, params.data![key]);
      });
    }
    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }

  // 支持supportFormData
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  // get请求
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  // post请求
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  // put请求
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  // delete请求
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  // 发送request
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);
    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;
    conf = this.supportFormData(conf);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const result = transformRequestHook(res, opt);
              resolve(result);
            } catch (error) {
              reject(error || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          reject(e);
        });
    });
  }
}

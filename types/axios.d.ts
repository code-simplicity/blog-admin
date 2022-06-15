/*
 * @Author: bugdr
 * @Date: 2022-06-15 13:35:49
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 13:40:37
 * @FilePath: \react-blog-admin\types\axios.d.ts
 * @Description:
 */
// 错误类型
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

// 请求配置项
export interface RequestOptions {
  // 开启url连接
  joinParamsToUrl?: boolean;
  // 格式化时间
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
}

// 返回结果
export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}

export interface UploadFileParams {
  // Other parameters
  data?: any;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

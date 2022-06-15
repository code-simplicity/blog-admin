/*
 * @Author: bugdr
 * @Date: 2022-06-15 12:25:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 12:58:00
 * @FilePath: \react-blog-admin\src\utils\http\AxiosCanceler.ts
 * @Description:AxiosCancele取消
 */
import axios from 'axios';
import type { AxiosRequestConfig, Canceler } from 'axios';
import { isFunction } from '../is';

let pendingMap = new Map<string, Canceler>();
// 获取挂载的url
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  // 添加挂起
  addPending(config: AxiosRequestConfig) {
    // 去除挂起
    this.removePending(config);
    // 获取挂起的url
    const url = getPendingUrl(config);
    // 取消token
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) pendingMap.set(url, cancel);
      });
  }

  //   去除一个挂起
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      // 删除
      pendingMap.delete(url);
    }
  }

  // 去除所有的挂起
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    // 清除
    pendingMap.clear();
  }

  // 重置
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}

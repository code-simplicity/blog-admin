/*
 * @Author: bugdr
 * @Date: 2022-06-15 12:03:42
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 15:06:38
 * @FilePath: \react-blog-admin\src\utils\index.ts
 * @Description:工具栏的总入口
 */

import { isObject } from 'lodash-es';
import { AppRouterRecordRaw } from '../router/types';

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

// 加载路由文件，解析文件
export const resolveRoute = (modules: any) => {
  const routeModuleList: any[] = [];
  Object.keys(modules).forEach((item) => {
    const mod = modules[item].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  });
  return routeModuleList;
};

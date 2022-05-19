/*
 * @Author: bugdr
 * @Date: 2022-05-02 14:03:13
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 10:39:05
 * @FilePath: \blog-admin\src\utils\index.ts
 * @Description:
 */
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Plugin } from 'vue';
import { message as Message } from 'ant-design-vue';
import { unref } from 'vue';
import { isObject } from '/@/utils/is';

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

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

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

/**
 * 返回状态码
 */
export enum ResponseCode {
  SUCCESS = 20000, // 操作成功
  LOGIN_SUCCESS = 20001, // 登录成功
  JOIN_IN_SUCCESS = 20002, // 注册成功
  FAILED = 40000, // 操作失败
  GET_RESOURCE_FAILED = 40001, // 获取资源失败
  ACCOUNT_NOT_LOGIN = 40002, // 账户未登录
  ROLE_TOURIST = 40010, // 游客登录
  PERMISSION_DENIED = 40011, // 无权限操作
  ACCOUNT_DENIED = 40003, // 账户被禁止
  ERROR_403 = 40004, // 权限不足
  ERROR_404 = 40004, // 页面丢失
  ERROR_504 = 40004, // 系统繁忙，请稍后重试
  ERROR_505 = 40004, // 请求错误，请检查数据是否正确
  WAiTING_FOR_SCAN = 40004, // 等待扫码
  QR_CODE_DEPRECATE = 40004, // 二维码已过期
  LOGIN_FAILED = 40004, // 登录失败
}

// 日期格式化
export function formDate(str: string, type: string) {
  const date = new Date(str);
  const year = date.getFullYear();
  const month = formatZero(date.getMonth() + 1, 2);
  const day = formatZero(date.getDay(), 2);
  const hour = formatZero(date.getHours(), 2);
  const minute = formatZero(date.getMinutes(), 2);
  const seconds = formatZero(date.getSeconds(), 2);
  if (type === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  }
  if (type === 'YYYY-MM-DD HH:MM:SS') {
    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
  }
  if (type === 'MM/DD HH:MM:SS') {
    return `${month}/${day} ${hour}:${minute}:${seconds}`;
  }
}

// 签名补充一位数的方法
export function formatZero(num, len) {
  if (String(num).length > len) return num;
  return (Array(len).join('0') + num).slice(-len);
}

// 图片最大的支持
export const imageSize = 4 * 1024 * 1024;
// 上传图片的验证规则
export function uploadBeforeImageValid(file): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const isJapOrPngOrGif =
      file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif';
    const isImageSize = file.size > imageSize ? true : false;
    if (!isJapOrPngOrGif) {
      Message.error('只能上传png/jpg/gif格式文件');
      return reject(false);
    }
    if (isImageSize) {
      Message.error('图片过大，最多只能是4M，请压缩重新上传');
      return reject(false);
    }
    return resolve(true);
  });
}

/*
 * @Author: bugdr
 * @Date: 2022-06-15 12:55:16
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 12:57:22
 * @FilePath: \react-blog-admin\src\utils\is.ts
 * @Description:is的工具集合
 */

// 是不是函数
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

/*
 * @Author: bugdr
 * @Date: 2022-06-20 08:58:40
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 08:59:45
 * @FilePath: \react-blog-admin\types\index.d.ts
 * @Description:
 */
declare interface Fn<any = T, R = T> {
  (...any: T[]): R;
}

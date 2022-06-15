/*
 * @Author: bugdr
 * @Date: 2022-06-15 14:08:56
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 14:19:55
 * @FilePath: \react-blog-admin\src\utils\enums\httpEnum.ts
 * @Description:http的枚举常量
 */

// 请求的方式
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// 类型
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

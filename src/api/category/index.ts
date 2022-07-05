/*
 * @Author: bugdr
 * @Date: 2022-07-05 15:01:46
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 15:10:30
 * @FilePath: \react-blog-admin\src\api\category\index.ts
 * @Description:文章分类
 */

import { GetCaptchaListType } from './type';
import { defHttp } from '/@/utils/http';

enum CategoryApi {
  GetCaptchaList = '/admin/category/list',
}

/**
 * 获取文章分类
 * @param params
 * @returns
 */
export const getCategoryList = (params: GetCaptchaListType) => {
  return defHttp.get({
    url: `${CategoryApi.GetCaptchaList}`,
    params,
  });
};

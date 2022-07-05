/*
 * @Author: bugdr
 * @Date: 2022-07-05 15:01:46
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 19:26:49
 * @FilePath: \react-blog-admin\src\api\image\index.ts
 * @Description:文章分类
 */

import { GetImageListType } from './type';
import { defHttp } from '/@/utils/http';

enum ImageApi {
  GetImageList = '/admin/image/list',
}

/**
 * 获取所有图片
 * @param params
 * @returns
 */
export const getImageList = (params: GetImageListType) => {
  return defHttp.get({
    url: `${ImageApi.GetImageList}`,
    params,
  });
};

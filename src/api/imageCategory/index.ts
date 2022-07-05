/*
 * @Author: bugdr
 * @Date: 2022-07-05 20:05:54
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 20:08:03
 * @FilePath: \react-blog-admin\src\api\imageCategory\index.ts
 * @Description:图片分类
 */
import { GetImageCategoryListType } from './type';
import { defHttp } from '/@/utils/http';

enum ImageCategoryApi {
  GetImageCategoryList = '/admin/image/category/list',
}

/**
 * 获取图片分类
 * @param params
 * @returns
 */
export const getImageCategoryList = (params: GetImageCategoryListType) => {
  return defHttp.get({
    url: ImageCategoryApi.GetImageCategoryList,
    params,
  });
};

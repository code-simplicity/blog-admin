/*
 * @Author: bugdr
 * @Date: 2022-07-05 15:01:46
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-06 07:59:07
 * @FilePath: \react-blog-admin\src\api\image\index.ts
 * @Description:文章分类
 */

import { GetImageListType, UploadImageType } from './type';
import { defHttp } from '/@/utils/http';

enum ImageApi {
  GetImageList = '/admin/image/list',
  UploadImage = '/api/admin/image/',
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

/**
 * 上传图片
 * @data data
 * @returns
 */
export const uploadImage = (data: UploadImageType) => {
  const { original, file, ...params } = data;
  return defHttp.uploadFile(
    {
      url: `${ImageApi.UploadImage}${original}`,
      params,
    },
    file,
  );
};

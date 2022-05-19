/*
 * @Author: bugdr
 * @Date: 2022-05-18 16:27:21
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 10:10:36
 * @FilePath: \blog-admin\src\api\images\imageList.ts
 * @Description:
 */
import { GetImageListParams, UploadImageParams } from './model/imageListModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetImageList = '/admin/image/list',
  UploadImage = '/api/admin/image/',
}

/**
 * 获取图片列表
 * @param params
 * @returns
 */
export function getImageList(params: GetImageListParams) {
  return defHttp.get<ResultResponse>({
    url: Api.GetImageList,
    params,
  });
}

/**
 * 上传图片
 * @param data
 * @returns
 */
export function uploadImage(data: UploadImageParams) {
  const { original, file, ...params } = data;
  return defHttp.uploadFile<ResultResponse>(
    {
      url: `${Api.UploadImage}${original}`,
      params,
    },
    file,
  );
}

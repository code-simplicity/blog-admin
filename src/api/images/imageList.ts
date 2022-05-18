import { GetImageListParams, UploadImageParams } from './model/imageListModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetImageList = '/admin/image/list',
  UploadImage = '/admin/image/',
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
export function uploadImage(params: UploadImageParams) {
  const { original, imageCategoryId, ...data } = params;
  return defHttp.post<ResultResponse>({
    url: `${Api.UploadImage}${original}?imageCategoryId=${imageCategoryId}`,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;' },
  });
}

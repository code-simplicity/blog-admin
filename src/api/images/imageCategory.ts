import { GetImageCategoryListParams } from './model/imageCategoryModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetImageCategoryList = '/admin/image/category/list',
}

/**
 * 获取图片分类列表
 * @param params
 * @returns
 */
export function getImageCategoryList(params: GetImageCategoryListParams) {
  return defHttp.get<ResultResponse>({
    url: Api.GetImageCategoryList,
    params,
  });
}

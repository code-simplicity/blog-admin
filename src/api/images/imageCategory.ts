/*
 * @Author: bugdr
 * @Date: 2022-05-18 15:56:17
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-20 20:08:42
 * @FilePath: \blog-admin\src\api\images\imageCategory.ts
 * @Description: 添加图片分类管理
 */
import {
  AddImageCategoryParams,
  GetImageCategoryListParams,
  UpdateImageCategoryParams,
  DeleteImageCategoryParams,
} from './model/imageCategoryModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetImageCategoryList = '/admin/image/category/list',
  AddImageCategory = '/admin/image/category/',
  UpdateImageCategory = '/admin/image/category/',
  DeleteImageCategory = '/admin/image/category/',
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

/**
 * 添加图片的分类
 * @param params
 * @returns
 */
export function addImageCategory(params: AddImageCategoryParams) {
  const { userId, ...data } = params;
  return defHttp.post<ResultResponse>({
    url: `${Api.AddImageCategory}${userId}`,
    data,
  });
}

/**
 * 更新图片分类
 * @param params
 * @returns
 */
export function updateImageCategory(params: UpdateImageCategoryParams) {
  const { id, ...data } = params;
  return defHttp.put<ResultResponse>({
    url: `${Api.UpdateImageCategory}${id}`,
    data,
  });
}

/**
 * 删除图片分类
 * @param params
 * @returns
 */
export function deleteImageCategory(params: DeleteImageCategoryParams) {
  const { id } = params;
  return defHttp.delete<ResultResponse>({
    url: `${Api.DeleteImageCategory}${id}`,
  });
}

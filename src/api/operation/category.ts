/*
 * @Author: bugdr
 * @Date: 2022-05-08 22:42:43
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 16:43:52
 * @FilePath: \blog-admin\src\api\operation\category.ts
 * @Description:
 */
import {
  addCategoryParams,
  DeleteCategoryParams,
  GetCategoryListParams,
  UpdateCategoryParams,
} from './model/categoryModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetCategoryList = '/admin/category/list',
  AddCategory = '/admin/category',
  DeleteCategory = '/admin/category/',
  UpdateCategory = '/admin/category/',
}

/**
 * 获取文章分类列表
 * @returns
 */
export function getCategoryList(params: GetCategoryListParams) {
  return defHttp.get<ResultResponse>({
    url: Api.GetCategoryList,
    params,
  });
}

/**
 * 添加文章分类
 * @param data
 * @returns
 */
export function addCategory(data: addCategoryParams) {
  return defHttp.post<ResultResponse>({
    url: Api.AddCategory,
    data,
  });
}

/**
 * 删除文章分类
 * @param categoryId
 * @returns
 */
export function deleteCategory(categoryId: DeleteCategoryParams) {
  return defHttp.delete<ResultResponse>({
    url: `${Api.DeleteCategory}${categoryId}`,
  });
}

/**
 * 更新文章分类
 * @param categoryId
 * @returns
 */
export function updateCategory(data: UpdateCategoryParams) {
  const { id, ...params } = data;
  return defHttp.put<ResultResponse>({
    url: `${Api.UpdateCategory}${id}`,
    params,
  });
}

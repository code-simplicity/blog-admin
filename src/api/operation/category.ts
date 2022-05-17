/*
 * @Author: bugdr
 * @Date: 2022-05-08 22:42:43
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-17 13:36:16
 * @FilePath: \blog-admin\src\api\operation\category.ts
 * @Description:
 */
import { addCategoryParams } from './model/categoryModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetCategoryList = '/admin/category/list',
  AddCategory = '/admin/category',
}

/**
 * 获取文章分类列表
 * @returns
 */
export function getCategoryList() {
  return defHttp.get<ResultResponse>({
    url: Api.GetCategoryList,
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

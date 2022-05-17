/*
 * @Author: bugdr
 * @Date: 2022-05-08 22:42:57
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-17 22:26:55
 * @FilePath: \blog-admin\src\api\operation\model\categoryModel.ts
 * @Description:
 */
// 获取分类的参数接口
export interface GetCategoryListParams {
  page: string | number;
  size: string | number;
}
// 添加的参数接口
export interface addCategoryParams {
  name: string;
  pinyin: string;
  order: string | number;
  state: string | number;
  description: string;
}

/**
 * 删除参数接口
 */
export interface DeleteCategoryParams {
  id?: string;
}

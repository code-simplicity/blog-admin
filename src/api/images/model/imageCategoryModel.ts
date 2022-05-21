/*
 * @Author: bugdr
 * @Date: 2022-05-18 15:56:39
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-21 13:09:55
 * @FilePath: \blog-admin\src\api\images\model\imageCategoryModel.ts
 * @Description:图片分类的接口参数约束
 */
// 获取图片分类的接口参数
export interface GetImageCategoryListParams {
  page: string | number;
  size: string | number;
}

// 添加图片的接口参数约束
export interface AddImageCategoryParams {
  userId: string | number;
  categoryName?: string;
}

// 添加图片的接口参数约束
export interface UpdateImageCategoryParams {
  id: string | number;
  categoryName: string | number;
  userId: string | number;
}

// 添加图片的接口参数约束
export interface DeleteImageCategoryParams {
  id?: string;
}

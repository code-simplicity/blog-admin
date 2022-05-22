/*
 * @Author: bugdr
 * @Date: 2022-05-18 15:56:39
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-22 06:57:30
 * @FilePath: \blog-admin\src\api\images\model\imageCategoryModel.ts
 * @Description:图片分类的接口参数约束
 */
// 获取图片分类的接口参数
export interface GetImageCategoryListParams {
  page: string | number;
  size: string | number;
  categoryName: string;
  userId: string | number;
}

// 添加图片的接口参数约束
export interface AddImageCategoryParams {
  userId: string | number;
  categoryName?: string;
}

// 更新图片的接口参数约束
export interface UpdateImageCategoryParams {
  id: string | number;
  categoryName: string | number;
  userId: string | number;
}

// 删除图片的接口参数约束
export interface DeleteImageCategoryParams {
  id?: string;
}

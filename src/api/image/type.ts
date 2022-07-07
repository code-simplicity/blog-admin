/*
 * @Author: bugdr
 * @Date: 2022-07-05 15:09:18
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-06 09:31:21
 * @FilePath: \react-blog-admin\src\api\image\type.ts
 * @Description:类型
 */
// 获取图片列表的接口
export interface GetImageListType {
  page: number;
  size: number;
  categoryId?: string;
}

// 上传图片列表的接口
export interface UploadImageType {
  original?: string;
  imageCategoryId?: string | null;
  file?: any;
}

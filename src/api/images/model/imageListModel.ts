/*
 * @Author: bugdr
 * @Date: 2022-05-18 16:27:31
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 09:49:54
 * @FilePath: \blog-admin\src\api\images\model\imageListModel.ts
 * @Description:图片接口
 */
// 获取用户列表的接口
export interface GetImageListParams {
  original?: string;
  page: string | number;
  size: string | number;
}

// 上传图片的接口验证
export interface UploadImageParams {
  original?: string;
  imageCategoryId?: string | null;
  file?: any;
}

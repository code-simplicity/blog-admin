/*
 * @Author: bugdr
 * @Date: 2022-07-05 20:06:06
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 20:08:51
 * @FilePath: \react-blog-admin\src\api\imageCategory\type.ts
 * @Description:图片分类类型
 */
export interface GetImageCategoryListType {
  page: number;
  size: number;
  userId?: string;
}

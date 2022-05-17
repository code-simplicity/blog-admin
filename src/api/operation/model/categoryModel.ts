/*
 * @Author: bugdr
 * @Date: 2022-05-08 22:42:57
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-17 13:35:36
 * @FilePath: \blog-admin\src\api\operation\model\categoryModel.ts
 * @Description:
 */
// 添加的参数接口
export interface addCategoryParams {
  name: string;
  pinyin: string;
  order: string | number;
  state: string | number;
  description: string;
}

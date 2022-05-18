/*
 * @Author: bugdr
 * @Date: 2022-05-18 08:58:48
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-18 09:03:18
 * @FilePath: \blog-admin\src\api\operation\model\looperModel.ts
 * @Description:轮播图接口的参数校验接口
 */
export interface GetLooperListParams {
  page: string | number;
  size: string | number;
}

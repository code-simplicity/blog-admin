/*
 * @Author: bugdr
 * @Date: 2022-05-18 08:58:48
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 16:09:33
 * @FilePath: \blog-admin\src\api\operation\model\looperModel.ts
 * @Description:轮播图接口的参数校验接口
 */
// 获取轮播图的接口参数
export interface GetLooperListParams {
  page: string | number;
  size: string | number;
}

// 添加轮播图的接口参数
export interface AddLooperParams {
  imageUrl?: string;
  order?: string | number;
  state?: string | number;
  targetUrl?: string;
  title?: string;
}

// 更新轮播图的接口参数
export interface UpdateLooperParams {
  id?: string;
  imageUrl?: string;
  order?: string | number;
  state?: string | number;
  targetUrl?: string;
  title?: string;
}

// 删除轮播图的接口参数
export interface DeleteLooperParams {
  id?: string;
}

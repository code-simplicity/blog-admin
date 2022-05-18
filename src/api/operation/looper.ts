/*
 * @Author: bugdr
 * @Date: 2022-05-18 08:58:36
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-18 09:27:13
 * @FilePath: \blog-admin\src\api\operation\looper.ts
 * @Description:轮播图接口
 */
import { GetLooperListParams } from './model/looperModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetLooperList = '/admin/loop/list',
}

/**
 * 获取轮播图
 * @param params
 * @returns
 */
export function getLooperList(params: GetLooperListParams) {
  return defHttp.get<ResultResponse>({
    url: Api.GetLooperList,
    params,
  });
}

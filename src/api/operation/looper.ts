/*
 * @Author: bugdr
 * @Date: 2022-05-18 08:58:36
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 16:09:11
 * @FilePath: \blog-admin\src\api\operation\looper.ts
 * @Description:轮播图接口
 */
import {
  AddLooperParams,
  DeleteLooperParams,
  GetLooperListParams,
  UpdateLooperParams,
} from './model/looperModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetLooperList = '/admin/loop/list',
  AddLooper = '/admin/loop',
  UpdateLooper = '/admin/loop/',
  DeleteLooper = '/admin/loop/',
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

/**
 * 添加轮播图
 * @param data
 * @returns
 */
export function addLooper(data: AddLooperParams) {
  return defHttp.post<ResultResponse>({
    url: Api.AddLooper,
    data,
  });
}

/**
 * 更新轮播图
 * @param data
 * @returns
 */
export function updateLooper(data: UpdateLooperParams) {
  const { id, ...params } = data;
  return defHttp.put<ResultResponse>({
    url: `${Api.UpdateLooper}${id}`,
    params,
  });
}

/**
 * 删除轮播图
 * @param data
 * @returns
 */
export function deleteLooper(data: DeleteLooperParams) {
  const { id } = data;
  return defHttp.delete<ResultResponse>({
    url: `${Api.DeleteLooper}${id}`,
  });
}

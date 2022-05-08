import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetCategoryList = '/admin/category/list',
}

/**
 * 获取文章分类列表
 * @returns
 */
export function getCategoryList() {
  return defHttp.get<ResultResponse>({
    url: Api.GetCategoryList,
  });
}

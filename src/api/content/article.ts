/*
 * @Author: bugdr
 * @Date: 2022-05-08 16:09:43
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-08 20:39:45
 * @FilePath: \blog-admin\src\api\content\article.ts
 * @Description:文章管理的接口
 */
import {
  ChangeArticleStateParams,
  GetArticleListParams,
  TopArticleParams,
} from './model/articleModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetListArticles = '/admin/article/list/',
  TopArticle = '/admin/article/top/',
  ChangeArticleState = '/admin/article/sate/',
}
/**
 *获取文章列表
 * @param data
 * @returns
 */
export function getArticleList(data: GetArticleListParams) {
  const { page, size, ...params } = data;
  return defHttp.get<ResultResponse>({
    url: `${Api.GetListArticles}${page}/${size}`,
    params,
  });
}

/**
 * 文章置顶
 * @param params
 * @returns
 */
export function topArticle(params: TopArticleParams) {
  return defHttp.put<ResultResponse>({
    url: Api.TopArticle,
    params,
  });
}

/**
 * 删除文章，逻辑删除
 * @param params
 * @returns
 */
export function changeArticleState(params: ChangeArticleStateParams) {
  return defHttp.delete<ResultResponse>({
    url: Api.ChangeArticleState,
    params,
  });
}

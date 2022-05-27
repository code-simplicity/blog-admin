/*
 * @Author: bugdr
 * @Date: 2022-05-08 16:09:43
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-27 12:56:03
 * @FilePath: \blog-admin\src\api\content\article.ts
 * @Description:文章管理的接口
 */
import {
  ChangeArticleStateParams,
  GetArticleListParams,
  PostArticleParams,
  TopArticleParams,
  UpdateArticleParams,
} from './model/articleModel';
import { defHttp } from '/@/utils/http/axios';
import { ResultResponse } from '/@/utils/resultResponse';

enum Api {
  GetListArticles = '/admin/article/list/',
  TopArticle = '/admin/article/top/',
  ChangeArticleState = '/admin/article/sate/',
  PostArticle = '/admin/article',
  GetArticleByArticleId = '/admin/article/',
  UpdateArticle = '/admin/article/',
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

/**
 * 发表文章
 * @param data
 * @returns
 */
export function postArticle(data: PostArticleParams) {
  return defHttp.post<ResultResponse>({
    url: Api.PostArticle,
    data,
  });
}

/**
 * 获取文章，给编辑文章使用的
 * @param articleId
 * @returns
 */
export function getArticleByArticleId(articleId: string) {
  return defHttp.get<ResultResponse>({
    url: `${Api.GetArticleByArticleId}${articleId}`,
  });
}

/**
 * 更新文章
 * @param params
 * @returns
 */
export function updateArticle(params: UpdateArticleParams) {
  const { id, ...data } = params;
  return defHttp.put<ResultResponse>({
    url: `${Api.UpdateArticle}${id}`,
    data,
  });
}

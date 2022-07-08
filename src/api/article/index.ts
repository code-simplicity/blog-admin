/*
 * @Author: bugdr
 * @Date: 2022-07-08 12:54:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-08 12:58:30
 * @FilePath: \react-blog-admin\src\api\article\index.ts
 * @Description:发表文章
 */
import { PostArticleType } from './type';
import { defHttp } from '/@/utils/http';

enum articleApi {
  PostArticle = '/admin/article',
}
/**
 * 发表文章
 * @param data
 * @returns
 */
export function postArticle(data: PostArticleType) {
  return defHttp.post({
    url: articleApi.PostArticle,
    data,
  });
}

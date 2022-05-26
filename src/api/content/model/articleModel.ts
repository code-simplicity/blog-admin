/*
 * @Author: bugdr
 * @Date: 2022-05-08 16:10:21
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-24 16:29:18
 * @FilePath: \blog-admin\src\api\content\model\articleModel.ts
 * @Description:文章接口的类型
 */

// 获取文章参数
export interface GetArticleListParams {
  page: string | number;
  size: string | number;
  categoryId: string | number;
  keyword: string | number;
  state: string | number;
}

// 置顶文章参数类型约束
export interface TopArticleParams {
  id: string | number;
}

// 删除文章参数类型约束
export interface ChangeArticleStateParams {
  id: string | number;
}

// 发表文章的接口参数类型
export interface PostArticleParams {
  id: string | number;
  title: string;
  content?: any;
  categoryId: string;
  summary: string;
  cover: string;
  label: string;
  state: string;
  type: string;
}

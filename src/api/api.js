import http from './http';

export const success_code = 20000;
export const failed_code = 40000;

//解析token
export const checkToken = () => {
    return http.requestGet('/user/check-token');
};

//登录
export const doLogin = (verifyCode, sobUser) => {
    return http.requestPost('/user/login/' + verifyCode + '/?from=_p', sobUser);
};

//获取分类列表
export const listCategories = () => {
    return http.requestGet('/admin/category/list');
};

//删除分类
export const deleteCategoryById = (categoryId) => {
    return http.requestDelete('/admin/category/' + categoryId);
};

//添加分类
export const postCategory = (category) => {
    return http.requestPost('/admin/category/', category);
};

//更新分类
export const updateCategory = (categoryId, category) => {
    return http.requestPut('/admin/category/' + categoryId, category);
};

//获取轮播图列表
export const listLoop = () => {
    return http.requestGet('/admin/loop/list');
};


//添加轮播图
export const postLoop = (loop) => {
    return http.requestPost('/admin/loop', loop);
};


//删除轮播图
export const deleteLoop = (loopId) => {
    return http.requestDelete('/admin/loop/' + loopId);
};


//修改轮播图
export const updateLoop = (loopId, loop) => {
    return http.requestPut('/admin/loop/' + loopId, loop);
};

//获取用户列表
export const listUsers = (page, size) => {
    return http.requestGet('/user/list?page=' + page + '&size=' + size);
};

//获取用户列表，通过查询
export const doUserSearch = (userName, email) => {
    return http.requestGet('/user/list?page=1&size=10&userName=' + userName + '&email=' + email);
};

//删除用户
export const deleteUserById = (userId) => {
    return http.requestDelete('/user/' + userId);
};

//重置密码
export const resetPassword = (userId, newPassword) => {
    return http.requestPut('/user/reset-password/' + userId + '?password=' + newPassword);
};

//获取邮箱验证码
export const getVerifyCode = (emailAddress, type) => {
    return http.requestGet('/user/verify_code?email=' + emailAddress + '&type=' + type);
};

//更新当前用户的邮箱地址
export const updateEmailAddress = (emailAddress, verifyCode) => {
    return http.requestPut('/user/email?email=' + emailAddress + '&verify_code=' + verifyCode);
};

//检查用户名是否已存在
export const checkUserName = (userName) => {
    return http.requestGet('/user/user_name?userName=' + userName);
};

//更新用户信息
export const updateUserInfo = (userId, userInfo) => {
    return http.requestPut('/user/user_info/' + userId, userInfo);
};

//获取SEO信息
export const getSeoInfo = () => {
    return http.requestGet('/admin/web_size_info/seo');
};

//获取网站的标题
export const getWebSizeTitle = () => {
    return http.requestGet('/admin/web_size_info/title');
};

//更新网站的标题
export const updateWebSizeTitle = (title) => {
    return http.requestPut('/admin/web_size_info/title?title=' + title);
};

//更新网站的SEO信息
export const updateSeoInfo = (description, keyword) => {
    return http.requestPut('/admin/web_size_info/seo?description=' + description + '&keywords=' + keyword);
};

//获取友情链接
export const listFriendLinks = () => {
    return http.requestGet('/admin/friend_link/list');
};

//添加友情链接
export const postFriendLink = (friendLink) => {
    return http.requestPost('/admin/friend_link', friendLink);
};

//更新友情链接
export const updateFriendLink = (friendLink, linkId) => {
    return http.requestPut('/admin/friend_link/' + linkId, friendLink);
};

//删除友情链接
export const deleteFriendLink = (linkId) => {
    return http.requestDelete('/admin/friend_link/' + linkId);
};

//获取图片列表
export const listImages = (page, size, original) => {
    return http.requestGet('/admin/image/list/' + page + '/' + size + '?original=' + original);
};

//发表文章
export const postArticle = (article) => {
    return http.requestPost('/admin/article', article);
};

//保存草稿
export const saveArticleDraft = (article) => {
    return http.requestPost('/admin/article', article);
};

//获取文章列表
export const listArticles = (page, size, state, keyword, categoryId) => {
    let targetUrl = '/admin/article/list/' + page + '/' + size + '?state=' + state
        + '&categoryId=' + categoryId + '&keyword=' + keyword;
    window.console.log(targetUrl);
    return http.requestGet(targetUrl);
};

//真的删除文章
export const deleteArticleAbs = (articleId) => {
    return http.requestDelete('/admin/article/' + articleId);
};

//假装删除文章，改变状态
export const deleteArticlePretend = (articleId) => {
    return http.requestDelete('/admin/article/sate/' + articleId);
};

//文章置顶
export const topArticle = (articleId) => {
    return http.requestPut('/admin/article/top/' + articleId);
};

//获取文章的详情，跳转到编辑文章（也就是发表文章）
export const getArticleDetail = (articleId) => {
    return http.requestGet('/admin/article/' + articleId);
};

//修改文章
export const updateArticle = (articleId, article) => {
    return http.requestPut('/admin/article/' + articleId, article);
};

//获取评论列表
export const listComments = (page, size) => {
    return http.requestGet('/admin/comment/list/' + page + '/' + size);
};

//评论置顶
export const topComment = (commentId) => {
    return http.requestPut('/admin/comment/top/' + commentId);
};

//删除评论
export const deleteCommentById = (commentId) => {
    return http.requestDelete('/admin/comment/' + commentId);
};

//删除图片
export const deleteImageById = (imageId) => {
    return http.requestDelete('/admin/image/' + imageId);
};

//获取发表文章量
export const getArticleCount = () => {
    return http.requestGet('/admin/article/count');
};

//获取浏览量
export const getViewCount = () => {
    return http.requestGet('/admin/web_size_info/view_count');
};

//获取用户注册量
export const getUserCount = () => {
    return http.requestGet('/user/register_count');
};

//获取评论总数
export const getCommentCount = () => {
    return http.requestGet('/admin/comment/count');
};

//退出登陆
export const doLogout = () => {
    return http.requestGet('/user/logout');
};

//获取留言列表
//http://localhost:8080/admin/message/list/1/10
export const listMessages = (page, size) => {
    return http.requestGet('/admin/message/list/' + page + '/' + size);
};

//留言置顶
//http://localhost:8080/admin/message/top/830848619832672256
export const topMessage = (meesageId) => {
    return http.requestPut('/admin/message/top/' + meesageId);
};

//删除留言
//http://localhost:8080/admin/message/830836370330091520
export const deleteMessageById = (meesageId) => {
    return http.requestDelete('/admin/message/' + meesageId);
};




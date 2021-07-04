<template>
    <div class="article-list-box">
        <div class="article-action-bar">
            <el-form :inline="true" size="medium">
                <el-form-item>
                    <el-input v-model="search.keyword" placeholder="请输入标题关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="search.state" placeholder="请选择状态">
                        <el-option label="已删除" value="0"></el-option>
                        <el-option label="已发布" value="1"></el-option>
                        <el-option label="草稿" value="2"></el-option>
                        <el-option label="置顶" value="3"></el-option>
                        <el-option label="所有状态" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="search.categoryId" placeholder="请选文章择分类">
                        <el-option
                                v-for="item in categories"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doArticleSearch">查询</el-button>
                    <el-button type="danger" @click="cleanSearch">清除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="article-list-part">
            <!--文章列表-->
            <el-table
                    v-loading="loading"
                    :data="articles"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="标题"
                        width="200">
                    <template slot-scope="scope">
                        <a class="articles-title"
                           :href="blog_constant.portalBaseUrl+ '/article/'+scope.row.id"
                           target="_blank">
                               <span v-text="scope.row.title">
                        </span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="viewCount"
                        label="浏览量"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.state==='0'">
                            <el-tag type="danger" size="medium">已删除</el-tag>
                        </div>
                        <div v-if="scope.row.state==='1'">
                            <el-tag type="primary" size="medium">已发布</el-tag>
                        </div>
                        <div v-if="scope.row.state==='2'">
                            <el-tag type="info" size="medium">&nbsp;草&nbsp;稿&nbsp;</el-tag>
                        </div>
                        <div v-if="scope.row.state==='3'">
                            <el-tag type="success" size="medium">&nbsp;置&nbsp;顶&nbsp;</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="summary"
                        label="摘要">
                </el-table-column>
                <el-table-column
                        label="创建日期"
                        width="200">
                    <template slot-scope="scope">
                        <span v-text="formatDate(scope.row.createTime)">

                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        class="category-update-time"
                        label="更新日期"
                        width="200">
                    <template slot-scope="scope">
                        <span v-text="formatDate(scope.row.updateTime)">

                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" v-if="scope.row.status!=='0'" size="mini"
                                   @click="deleteItem(scope.row)">删除
                        </el-button>
                        <el-button type="danger" v-if="scope.row.status==='0'" size="mini"
                                   @click="deleteItem(scope.row)" disabled>删除
                        </el-button>
                        <el-button type="success" v-if="scope.row.state==='3'" size="mini" @click="top(scope.row)">取消置顶
                        </el-button>
                        <el-button type="success" v-else size="mini" @click="top(scope.row)">置顶</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="article-page-navigation margin-bottom-10">
            <!--分页-->
            <el-pagination
                    class="article-list-page-navigation-bar"
                    background
                    @current-change="onPageChange"
                    :current-page="pageNavigation.currentPage"
                    :page-size="pageNavigation.pageSize"
                    layout="prev, pager, next"
                    :total="pageNavigation.totalCount">
            </el-pagination>
        </div>
        <div class="article-dialog-part">
            <!--删除提示-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="删除提示"
                    :visible.sync="deleteDialogShow"
                    width="500px">
                <span>你确定要删除: {{deleteMessage}} 这篇文章吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="doAbsDelete">绝对删除</el-button>
                    <el-button size="mini" type="primary" @click="doDeleteItem">假装删除</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import * as api from '../../api/api';
    import * as dateUtils from '../../utils/date';

    export default {
        data() {
            return {
                deleteMessage: '',
                deleteDialogShow: false,
                loading: false,
                articles: [],
                search: {
                    keyword: '',
                    state: '',
                    categoryId: ''
                },
                categories: [],
                pageNavigation: {
                    currentPage: 1,
                    totalCount: 0,
                    pageSize: 10,
                },
                targetDeleteArticleId: ''
            }
        },
        methods: {
            edit(item) {
                let articleId = item.id;
                this.$router.push({
                    path: '/content/post-article',
                    query: {
                        articleId: articleId
                    }
                });
            },
            doAbsDelete() {
                api.deleteArticleAbs(this.targetDeleteArticleId).then(result => {
                    if (result.code === api.success_code) {
                        this.$message.success(result.message);
                        this.deleteDialogShow = false;
                        this.listArticles();
                    } else {
                        this.$message.error(result.message);
                    }
                })
            },
            doDeleteItem() {
                api.deleteArticlePretend(this.targetDeleteArticleId).then(result => {
                    if (result.code === api.success_code) {
                        this.$message.success(result.message);
                        this.deleteDialogShow = false;
                        this.listArticles();
                    } else {
                        this.$message.error(result.message);
                    }
                })
            },
            deleteItem(item) {
                this.targetDeleteArticleId = item.id;
                this.deleteMessage = item.title;
                this.deleteDialogShow = true;
            },
            top(item) {
                api.topArticle(item.id).then(result => {
                    if (result.code === api.success_code) {
                        this.$message.success(result.message);
                        this.listArticles();
                    } else {
                        this.$message.error(result.message);
                    }
                })
            },
            onPageChange(page) {
                this.pageNavigation.currentPage = page;
                this.listArticles();
            },
            cleanSearch() {
                this.search.categoryId = '';
                this.search.state = '';
                this.search.keyword = '';
                this.listArticles();
            },
            doArticleSearch() {
                window.console.log('do article search');
                this.listArticles();
            },
            listCategories() {
                api.listCategories().then(result => {
                    if (result.code === api.success_code) {
                        this.categories = result.data;
                        this.categories.push({
                            id: '',
                            name: '所有分类'
                        })
                    }
                });
            },
            listArticles() {
                this.loading = true;
                api.listArticles(this.pageNavigation.currentPage,
                    this.pageNavigation.pageSize,
                    this.search.state, this.search.keyword,
                    this.search.categoryId).then(result => {
                    // window.console.log(result);
                    if (result.code === api.success_code) {
                        this.articles = result.data.contents;
                        this.pageNavigation.currentPage = result.data.currentPage;
                        this.pageNavigation.totalCount = result.data.totalCount;
                        this.pageNavigation.pageSize = result.data.pageSize;
                    }
                    this.loading = false;
                });
            },
            formatDate(dateStr) {
                let date = new Date(dateStr);
                return dateUtils.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
        },
        mounted() {
            this.listArticles();
            this.listCategories();
        }
    }
</script>
<style>
    .articles-title {
        color: blue;
    }
    .article-list-box {
        padding: 10px;
    }
</style>
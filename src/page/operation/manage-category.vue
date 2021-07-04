<template>
    <div class="category-box">
        <div class="category-action-bar margin-bottom-10">
            <el-button type="primary" size="medium" @click="showAddCategory">添加分类</el-button>
        </div>
        <div class="category-list-box">
            <el-table
                    v-loading="loading"
                    :data="categories"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="分类名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="pinyin"
                        label="拼音"
                        width="150">
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status==='0'">
                            <el-tag type="danger" size="medium">已删除</el-tag></div>
                        <div v-if="scope.row.status==='1'">
                            <el-tag type="success" size="medium">&nbsp;正&nbsp;常&nbsp;</el-tag></div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="250"
                        prop="description"
                        label="描述">
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
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="edit(scope.row)">编 辑</el-button>
                        <el-button type="danger" v-if="scope.row.status!=='0'" size="mini"
                                   @click="deleteItem(scope.row)">删 除</el-button>
                        <el-button type="danger" v-if="scope.row.status==='0'" size="mini"
                                   @click="deleteItem(scope.row)" disabled>删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="category-dialog-box">
            <el-dialog
                    title="删除提示"
                    :visible.sync="deleteDialogShow"
                    width="400px">
                <span>你确定要删除: {{deleteMessage}}这个分类吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="medium" type="danger" @click="deleteDialogShow = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="doDeleteItem">确 定</el-button>
                </span>
            </el-dialog>
            <!--添加/编辑分类的dialog-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    :title="editTitle"
                    :visible.sync="editorDialogShow"
                    width="600px">
                <div class="category-editor-box">
                    <el-form label-width="80px" szie="medium">
                        <el-form-item label="分类名称">
                            <el-input v-model="category.name"></el-input>
                        </el-form-item>
                        <el-form-item label="分类拼音">
                            <el-input v-model="category.pinyin"></el-input>
                        </el-form-item>
                        <el-form-item label="分类描述">
                            <el-input v-model="category.description"
                                      type="textarea"
                                      :row="2"
                                      maxlength="128"
                                      resize="none"></el-input>
                        </el-form-item>
                        <el-form-item label="顺序">
                            <el-input-number v-model="category.order" :min="1" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="category.status" placeholder="请选择状态">
                                <el-option label="已删除" value="0"></el-option>
                                <el-option label="正常" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onEditorClose"  size="medium" type="danger">取 消</el-button>
                    <el-button type="primary" size="medium" @click="postCategory">{{editorCommitText}}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

</template>
<script>
    import *as api from '../../api/api';
    import *as dateUtils from '../../utils/date';

    export default {
        data(){
            return {
                loading: false,
                editorCommitText: '修改分类',
                editorDialogShow: false,
                editTitle: '编辑分类',
                categories: [],
                deleteDialogShow: false,
                deleteMessage: '',
                deleteTargetId: '',
                category: {
                    id: '',
                    name: '',
                    description: '',
                    order: 1,
                    pinyin: '',
                    status: '1'
                }
            }
        },
        methods: {
            onEditorClose() {
                this.editorDialogShow = false;
                this.resetCategory();
            },

            postCategory() {
                //检查内容
                if (this.category.name === '') {
                    this.showWarning('分类名称不可以为空');
                    return;
                }
                if (this.category.pinyin === '') {
                    this.showWarning('分类名称拼音不可以为空');
                    return;
                }
                if (this.category.description === '') {
                    this.showWarning('分类描述不可以为空');
                    return;
                }
                //提交数据
                //提示结果
                //刷新列表
                //如果有ID的就是更新
                //如果没有ID的就是添加的
                if (this.category.id === '') {
                    api.postCategory(this.category).then(result => {
                        this.editorDialogShow = false;
                        if (result.code === api.success_code){
                            this.$message({
                                message: '添加成功',
                                center: true,
                                type: 'success'
                            });
                            //刷新列表
                            this.listCategories();
                            //重置数据
                            this.resetCategory();
                        } else {
                            this.showWarning(result.message);
                        }
                    });
                }else {
                    api.updateCategory(this.category.id, this.category).then(result => {
                        if (result.code === api.success_code) {
                            this.$message.success(result.message);
                            this.editorDialogShow = false;
                            this.listCategories();
                            this.resetCategory();
                        } else {
                            this.$message.error(result.message);
                        }
                    });
                }
            },

            resetCategory(){
                this.category.name = '';
                this.category.pinyin = '';
                this.category.order = 1;
                this.category.id = '';
                this.category.status = '1';
                this.category.description = '';
            },

            edit(item) {
                //赋值，最好的做法是请求单个数据，再显示，数据回显。
                //显示dialog
                this.category.name = item.name;
                this.category.description = item.description;
                this.category.order = item.order;
                this.category.id = item.id;
                this.category.pinyin = item.pinyin;
                this.category.status = item.status;
                //console.log(item);
                this.editorDialogShow = true;
                this.editorCommitText = '修改分类';
                this.editTitle = '编辑分类';
                // window.console.log(item);
            },

            deleteItem(item) {
                //不是立马删除，而是给出提示
                //提示内容
                this.deleteDialogShow = this;
                this.deleteMessage = item.name;
                this.deleteTargetId = item.id;
                // window.console.log(item);
            },

            formatDate(dateStr){
                let date = new Date(dateStr)
                return dateUtils.formatDate(date,'yyyy-MM-dd hh:mm:ss')
            },

            doDeleteItem(){
                api.deleteCategoryById(this.deleteTargetId).then(result => {
                    window.console.log(result);
                    if (result.code === api.success_code) {
                        this.$message({
                            type: 'success',
                            center: true,
                            message: result.message
                        });
                        this.listCategories();
                    }
                });
                this.deleteTargetId = false;
            },

            listCategories() {
                this.loading = true;
                api.listCategories().then(result => {
                    this.loading = false;
                    // window.console.log(result);
                    if (result.code === api.success_code){
                        this.categories = result.data;
                    }
                });
            },

            showAddCategory() {
                this.editTitle = '添加分类';
                this.editorCommitText = '添 加';
                this.editorDialogShow = true;
            },
            showWarning(msg){
                this.$message({
                    message: msg,
                    type: 'waring',
                    center: true
                })
            }
        },
        mounted() {
            //去获取分类的列表
            this.listCategories();
        }
    }
</script>
<style>
    .category-box {
        padding: 20px;
    }

    .category-list-box .el-table {
        min-height: 200px;
    }
</style>
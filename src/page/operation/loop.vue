<template>
    <div class="loop-box">
        <div class="loop-action-bar margin-bottom-10">
            <el-button type="primary" size="medium" @click="showAddLoop">添加轮播图</el-button>
        </div>
        <div class="loop-list-box">
            <el-table
                    v-loading="loading"
                    :data="loops"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="200">
                </el-table-column>
                <el-table-column
                        width="150"
                        label="标题">
                    <template slot-scope="scope">
                        <a class="loop-title" :href="scope.row.targetUrl" target="_blank">{{scope.row.title}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                        label="轮播图"
                        width="200">
                    <template slot-scope="scope">
                        <el-image fit="cover" :src="scope.row.imageUrl" class="loop-image"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.state==='0'">
                            <el-tag type="danger" size="medium">不可用</el-tag>
                        </div>
                        <div v-if="scope.row.state==='1'">
                            <el-tag type="success" size="medium">&nbsp;正&nbsp;常&nbsp;</el-tag>
                        </div>
                    </template>
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
                        <el-button type="primary" size="medium" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="medium"
                                   @click="deleteItem(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="loop-dialog-box">
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="删除提示"
                    :visible.sync="deleteDialogShow"
                    width="400px">
                <span>你确定要删除: {{deleteMessage}} 这个轮播图吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="medium" type="danger" @click="deleteDialogShow = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="doDeleteItem">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :title="loopEditorTitle"
                    :visible.sync="loopDialogShow"
                    width="600px">
                <div>
                    <el-form label-width="100px" size="medium">
                        <el-form-item label="轮播图标题">
                            <el-input v-model="loop.title"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转连接">
                            <el-input v-model="loop.targetUrl"></el-input>
                        </el-form-item>
                        <el-form-item label="顺序">
                            <el-input-number v-model="loop.order" :min="1" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="loop.state" placeholder="请选择状态">
                                <el-option label="不可用" value="0"></el-option>
                                <el-option label="正常" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="封面">
                            <el-upload
                                    class="avatar-uploader"
                                    action="/admin/image/loop"
                                    :show-file-list="false"
                                    :on-success="uploadSuccess"
                                    :before-upload="beforeUpload">
                                <el-image fit="cover" v-if="loop.imageUrl!==''" :src="loop.imageUrl"
                                          class="avatar"></el-image>
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editorClose" type="danger" size="medium">取 消</el-button>
                <el-button type="primary" @click="handleLoopEditorCommit"
                           size="medium">{{loopEditorDialogCommitText}}</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import * as dateUtils from '../../utils/date';
    import * as api from '../../api/api';

    export default {
        data() {
            return {
                deleteMessage: '',
                deleteDialogShow: false,
                loopEditorDialogCommitText: '修 改',
                loopDialogShow: false,
                loopEditorTitle: '编辑轮播图',
                loading: false,
                loops: [],
                loop: {
                    id: '',
                    order: 1,
                    state: '1',
                    title: '',
                    targetUrl: '',
                    imageUrl: ''
                },
                deleteLoopId: ''
            }
        },
        methods: {
            editorClose() {
                this.loopDialogShow = false;
                this.resetLoop();
            },

            doDeleteItem() {
                //通过ID来删除图片
                api.deleteLoop(this.deleteLoopId).then(result => {
                    if (result.code === api.success_code) {
                        this.deleteDialogShow = false;
                        this.$message.success(result.message);
                        this.listLoop();
                    }
                })
            },

            handleLoopEditorCommit() {
                //添加记录
                //检查数据

                if (this.loop.title === '') {
                    this.$message.error('标题不可以为空');
                    return;
                }
                if (this.loop.targetUrl === '') {
                    this.$message.error('跳转链接不可以为空');
                    return;
                }
                if (!this.loop.targetUrl.startsWith('http:///') &&
                    !this.loop.targetUrl.startsWith('https://')) {
                    this.$message.error('目标链接格式错误');
                    return;
                }
                if (this.loop.imageUrl === '') {
                    this.$message.error('轮播图不可以为空');
                    return;
                }
                //判断是更新还是添加
                //如果有id就是更新
                //否则就是添加
                if (this.loop.id === '') {
                    //提交数据
                    api.postLoop(this.loop).then(result => {
                        this.loopDialogShow = false;
                        if (result.code === api.success_code) {
                            this.$message.success(result.message);
                            //更新列表
                            this.resetLoop();
                            this.listLoop();
                        } else {
                            this.$message.error(result.message);
                        }
                    });
                } else {
                    //走更新的逻辑
                    api.updateLoop(this.loop.id, this.loop).then(result => {
                        if (result.code === api.success_code) {
                            //更新成功.
                            this.loopDialogShow = false;
                            this.listLoop();
                            this.resetLoop();
                            this.$message.success(result.message);
                        } else {
                            this.$message.error(result.message);
                        }
                    })
                }
            },

            resetLoop() {
                this.loop.id = '';
                this.loop.order = 1;
                this.loop.state = '1';
                this.loop.title = '';
                this.loop.targetUrl = '';
                this.loop.imageUrl = '';
            },

            beforeUpload() {
                console.log('beforeUpload...');
            },

            uploadSuccess(response) {
                if (response.code === api.success_code) {
                    //上传成功.
                    //回显图片
                    //http://localhost:8081/portal/image/1612780475141_808405435362050048.png
                    this.loop.imageUrl = this.blog_constant.imageBaseUrl + response.data.id;
                    this.$message.success(response.message);
                } else {
                    this.$message.error(response.message);
                }
            },
            edit(item) {
                //数据回显
                this.loopEditorDialogCommitText = '修 改';
                this.loopEditorTitle = '修改轮播图';
                this.loopDialogShow = true;
                this.loop.id = item.id;
                this.loop.order = item.order;
                this.loop.state = item.state;
                this.loop.title = item.title;
                this.loop.targetUrl = item.targetUrl;
                this.loop.imageUrl = item.imageUrl;
            },

            deleteItem(item) {
                this.deleteMessage = item.title;
                this.deleteLoopId = item.id;
                this.deleteDialogShow = true;
            },

            showAddLoop() {
                this.loopEditorDialogCommitText = '添 加';
                this.loopEditorTitle = '添加轮播图';
                this.loopDialogShow = true;
            },

            formatDate(dateStr) {
                let date = new Date(dateStr);
                return dateUtils.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },

            listLoop() {
                this.loading = true;
                api.listLoop().then(result => {
                    console.log(result);
                    this.loading = false;
                    if (result.code === api.success_code) {
                        this.loops = result.data;
                    }
                });
            }
        },
        mounted() {
            this.listLoop();
        }
    }
</script>
<style>

    .loop-box {
        padding: 20px;
    }

    .loop-image {
        width: 180px;
        height: 80px;
        border-radius: 4px;
        border: #EDEDED solid 1px;
    }
    .loop-title {
        color: blue;
    }
    .loop-dialog-box .avatar-uploader .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        border-radius: 4px;
        line-height: 178px;
        border: #8c939d dashed 1px;
        text-align: center;
    }

    .loop-dialog-box .el-upload img {
        width: 178px;
        border-radius: 4px;
        height: 178px;
    }
</style>

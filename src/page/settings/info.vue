<template>
    <div class="settings-user-info-box">
        <div class="user-info-list-part">
            <el-form label-width="86px" v-if="userInfo!==null" size="medium">
                <el-form-item label="头像" class="user-info-avatar">
                    <div class="user-avatar-container" @click="showAvatarDialog">
                        <el-avatar :src="userInfo.avatar"></el-avatar>
                    </div>
                </el-form-item>
                <el-form-item label="用户ID">
                    <el-input type="text" v-model="userInfo.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址">
                    <el-input type="email" v-model="userInfo.email" autocomplete="off" disabled></el-input>
                    <el-button type="primary" class="update-email-btn" @click="toUpdateEmailPage">修改邮箱</el-button>
                </el-form-item>
                <el-form-item label="用户名" required>
                    <el-input type="text" v-model="userInfo.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="签名" required>
                    <el-input type="text" v-model="userInfo.sign" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateUserInfo" size="medium">修改账户信息</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="user-info-dialog">
            <avatar-upload
                    field="file"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                    v-model="showAvatarCutter"
                    :width="300"
                    :height="300"
                    url="/admin/image/avatar"
                    img-format="png"></avatar-upload>
        </div>
    </div>
</template>

<script>
    import *as api from '../../api/api';
    import avatarUpload from 'vue-image-crop-upload/upload-2.vue';

    export default {
        components: {
          'avatar-upload': avatarUpload
        },
        data() {
            return {
                lastUserName: '',
                showAvatarCutter: false,
                userInfo: null
            }
        },
        methods: {
            showAvatarDialog() {
                this.showAvatarCutter = true;
            },
            cropUploadFail() {
                this.$message.error("头像上传失败");
            },
            cropUploadSuccess(response) {
                if (response.code === api.success_code) {
                    this.$message.success(response.message);
                    //头像上传成功
                    this.userInfo.avatar = this.blog_constant.imageBaseUrl + response.data.id;
                    console.log(this.userInfo.avatar);
                } else {
                    this.$message.error(response.message);
                }
            },
            toUpdateEmailPage() {
                this.$router.push({
                    path: '/settings/email'
                })
            },
            updateUserInfo() {
                if (this.userInfo.userName === '') {
                    this.$message.error('用户名不可以为空');
                    return;
                }
                window.console.log(this.lastUserName);
                window.console.log(this.userInfo.userName);
                //检查数据
                //检查用户名是否重复
                if (this.lastUserName === this.userInfo.userName) {
                    this.doUpdateInfo();
                } else {
                    api.checkUserName(this.userInfo.userName).then(result => {
                        //我自己的是成功api.success_code
                        if (result.code === api.failed_code) {
                            this.doUpdateInfo();
                        } else {
                            this.$message.error('用户名已存在');
                        }
                    });
                }
            },
            doUpdateInfo() {
                if (this.userInfo.avatar === '') {
                    this.$message.error("头像不可以为空");
                    return;
                }
                api.updateUserInfo(this.userInfo.id, this.userInfo).then(result => {
                    if (result.code === api.success_code) {
                        this.getUserInfo();
                        this.$message.success(result.message);
                    } else {
                        this.$message.error(result.message);
                    }
                });
            },
            getUserInfo() {
                api.checkToken().then(result => {
                    if (result.code === api.success_code) {
                        this.userInfo = result.data;
                        this.lastUserName = this.userInfo.userName;
                    } else {
                        this.$message.error(result.message);
                    }
                })
            }
        },
        mounted() {
            this.getUserInfo();
        }
    }
</script>
<style>

    .user-info-list-part .el-form-item__label{
        background: #fcfcfa;
        text-align: right;
        border-bottom: solid 1px #E6E6E6;
        border-top: solid 1px #E6E6E6;
        border-left: solid 1px #E6E6E6;
    }
    .user-info-list-part .el-input__inner{
        border: solid 1px #E6E6E6;
        border-radius: 0;
        height: 38px;
    }
    .user-info-avatar {
        display: inline-block;
    }

    .update-email-btn {
        margin-left: 20px;
    }

    .user-avatar-container {
        width: 100px;
        cursor: pointer;
    }

    .settings-user-info-box .el-input {
        width: 250px;
    }
</style>
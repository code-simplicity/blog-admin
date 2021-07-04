<template>
    <div class="settings-web-info-box">
        <el-form label-width="100px" size="medium">
            <el-form-item label="网站名称">
                <el-input v-model="websizeTitle"></el-input>
            </el-form-item>
            <el-form-item label="网站关键字">
                <el-input v-model="keywords" placeholder="关键字用“,”隔开"></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input
                        type="textarea"
                        :rows="2"
                        v-model="description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateSeoInfo">更 新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import * as api from '../../api/api';

    export default {
        data() {
            return {
                websizeTitle: '',
                keywords: '',
                description: '',
                oldInfo: {
                    websizeTitle: '',
                    keywords: '',
                    description: '',
                }
            }
        },
        methods: {
            updateSeoInfo() {
                //检查数据
                if (this.websizeTitle === '') {
                    this.$message.error('网站标题不可以为空');
                    return;
                }
                if (this.keywords === '') {
                    this.$message.error('关键字不可以为空');
                    return;
                }
                if (this.description === '') {
                    this.$message.error('网站描述不可以为空');
                    return;
                }
                let isSeoInfoUpdate = false;
                if (this.description !== this.oldInfo.description || this.keywords !== this.oldInfo.keywords) {
                    //seo关键字描述不一样的时候
                    isSeoInfoUpdate = true;
                    api.updateSeoInfo().then(result => {
                        if (result.code === api.success_code) {
                            //更新成功
                            this.$message.success(result.message);
                            this.getWebsizeInfo();
                        }
                    });
                }
                //如果是更新SEO信息，就不做标题更新的提示
                //提交数据
                if (this.websizeTitle !== this.oldInfo.websizeTitle) {
                    //更新一下标题
                    api.updateWebSizeTitle(this.websizeTitle).then(result => {
                        if (result.code === api.success_code) {
                            if (!isSeoInfoUpdate) {
                                this.$message.success('网站标题更新成功');
                            }
                            this.getWebsizeTitle();
                        }
                    });
                }

            },
            getWebsizeInfo() {
                api.getSeoInfo().then(result => {
                    if (result.code === api.success_code) {
                        this.keywords = result.data['web_size_keywords'];
                        this.description = result.data['web_size_description'];
                        this.oldInfo.keywords = this.keywords;
                        this.oldInfo.description = this.description;
                    }
                });
            },
            getWebsizeTitle() {
                api.getWebSizeTitle().then(result => {
                    if (result.code === api.success_code) {
                        this.websizeTitle = result.data.value;
                        this.oldInfo.websizeTitle = this.websizeTitle;
                    }
                })
            }
        },
        mounted() {
            this.getWebsizeInfo();
            this.getWebsizeTitle();
        }
    }
</script>
<style>
    .settings-web-info-box {
        padding: 10px;
    }
    .settings-web-info-box .el-input, .settings-web-info-box .el-textarea {
        width: 500px;
    }
    .settings-web-info-box .el-form-item__label{
        background: #fcfcfa;
        text-align: right;
        border-bottom: solid 1px #E6E6E6;
        border-top: solid 1px #E6E6E6;
        border-left: solid 1px #E6E6E6;
    }
    .settings-web-info-box .el-input__inner{
        border: solid 1px #E6E6E6;
        border-radius: 0;
        height: 38px;
    }
</style>
<template>
    <div class="admin-login-box">
        <!--后台的登录入口，只有登录，没有注册，也没有找回密码-->
        <!--只有门户一个用户入口，如果是管理员则跳转到管理中心，否则，跳转到首页/重定向的页面-->
        <!--如果是门户的登录，则有登录、注册、找回密码这些功能.-->
        <!--顶部内容-->
        <div class="admin-login-header-box">
            <div class="admin-login-header-center center">
                <div class="admin-login-logo">
                    博客系统｜登录
                </div>
            </div>
        </div>
        <!--中间内容-->
        <div class="admin-login-center-box">
            <div class="center login-center-box">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form label-position="right" label-width="100px">
                            <el-form-item label="账户" required>
                                <el-input v-model="sobUser.userName" placeholder="用户名/邮箱地址"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" required>
                                <el-input type="password" v-model="originalPassword" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" required>
                                <el-input v-model="loginInfo.verifyCode" placeholder="请输入验证码"
                                @keyup.enter.native="doLogin"></el-input>
                                <img :src="captchaPath" @click="updateVerifyCode" class="captcha-code">
                            </el-form-item>
                            <el-form-item class="login-button">
                                <el-button type="primary" @click="doLogin" size="small"> 登 陆 </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import {hex_md5} from "../../utils/md5";
    import {doLogin,success_code} from '../../api/api';

    export default {
        data() {
            return{
                originalPassword: '',
                sobUser: {
                    userName: '',
                    password: '',
                },
                loginInfo: {
                    verifyCode:'',
                },
                captchaPath: '/user/captcha',
            }
        },
        methods: {
            toastE(msg){
                this.$message({
                    message: msg,
                    center: true,
                    type: 'error'
                })
            },
            doLogin(){
                //发起登陆
                //检查数据
                if (this.sobUser.userName === '') {
                    this.toastE('账号不可以为空');
                    return;
                }

                if (this.originalPassword === '') {
                    this.toastE('密码不可以为空');
                    return;
                }

                if (this.loginInfo.verifyCode === '') {
                    this.toastE('验证码不可以为空');
                    return;
                }
                this.sobUser.password = hex_md5(this.originalPassword);
                //向服务器提交数据
                doLogin(this.loginInfo.verifyCode,this.sobUser).then(result => {
                    //处理登陆结果
                    //判断状态
                    if (result.code === success_code) {
                        this.$message({
                            message:result.message,
                            center: true,
                            type: 'success'
                        });
                        //如果成功，成功跳转，判断角色，如果是普通用户，跳转到用户首页，如果是管理员，跳转到管理中心
                        //需要判断角色
                        this.$router.push({path: '/index'})
                    } else {
                        //更新验证码
                        this.updateVerifyCode();
                        this.toastE(result.message);
                    }
                });
            },
            updateVerifyCode(){
                this.captchaPath = '/user/captcha?random=' + Date.parse(new Date());
                window.console.log(this.captchaPath);
            }
        },
        mounted() {
            //检查登陆是否有效
            //如果已经登录过跳转到对应的页面
            this.updateVerifyCode();
        }
    }
</script>
<style>
    .captcha-code{
        cursor: pointer;
        width: 120px;
        height: 40px;
        vertical-align: middle;
        margin-left: 10px;
        border: solid 1px #A8E6E6;
        padding-left: 10px;
        padding-right: 10px;
    }

    .login-button{
        margin-bottom: 0;
    }

    .admin-login-header-box {
        width: 100%;
        height: 46px;
        margin-bottom: 20px;
        background: dodgerblue;
    }

    .admin-login-header-center{
      line-height: 46px;
        margin: 0 auto;
        width: 1140px;
    }

    .admin-login-logo{
        color: #fff;
        font-size: 20px;
        font-weight: 600;
    }

    .center {
        margin: 0 auto;
        width: 1140px;
    }

    .login-center-box .el-input{
        width: 200px;
    }

    .login-center-box{
        width: 1100px;
        background: #fff;
        box-shadow: 0 1px 10px #afafaf;
        border-radius: 4px;
        padding: 20px;
    }

    .login-center-box .el-form-item__label{
        background: #FAFAFA;
        text-align: center;
        border-bottom: solid 1px #E6E6E6;
        border-top: solid 1px #E6E6E6;
        border-left: solid 1px #E6E6E6;
    }

    .login-center-box .el-input__inner{
        border: solid 1px #E6E6E6;
        border-radius: 0;
        height: 42px;
    }
</style>
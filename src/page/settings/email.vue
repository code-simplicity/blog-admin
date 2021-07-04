<template>
    <div class="settings-email-box">
        <el-form label-width="100px" size="medium">
            <el-form-item
                    label="新邮箱地址" required>
                <el-input v-model="newEmail"></el-input>
                <el-button v-if="!isCountDowning" type="primary" @click="getVerifyCode"
                           class="email-get-verify-code-btn">获取验证码
                </el-button>
                <el-button v-else type="primary" @click="getVerifyCode" class="email-get-verify-code-btn" disabled>
                    {{countDownText}}
                </el-button>
            </el-form-item>
            <el-form-item
                    label="验证码" required>
                <el-input v-model="verifyCode"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateEmailAddress">修改邮箱</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import * as api from '../../api/api';

    export default {
        data() {
            return {
                isCountDowning: false,
                newEmail: '',
                verifyCode: '',
                countDownText: '重新发送(60)'
            }
        },
        methods: {
            getVerifyCode() {
                //第一步：校验邮箱格式是否正确
                let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                if (!reg.test(this.newEmail)) {
                    this.$message.error('邮箱格式错误');
                    return;
                }
                //this.$message.success('邮箱地址正确');
                //第三步：发起请求，获取验证码
                api.getVerifyCode(this.newEmail, 'update').then(result => {
                    if (result.code === api.success_code) {
                        this.startCountDown();
                        this.$message.success(result.message);
                    } else {
                        this.$message.error(result.message);
                    }
                });
        },
            startCountDown() {
                let time = 60;
                this.isCountDowning = true;
                let that = this;
                let interval = setInterval(function () {
                    //执行倒计时内容
                    time--;
                    if (time <= 0) {
                        that.isCountDowning = false;
                        clearInterval(interval);
                    }
                    that.countDownText = '重新发送(' + time + ')';
                    // console.log('倒计时 == >  ' + time + '  ' + that.countDownText);
                }, 1000);
            },
            updateEmailAddress() {
                //内容校验
                if (this.newEmail === '') {
                    this.$message.error('邮箱地址不可以为空');
                    return;
                }
                if (this.verifyCode === '') {
                    this.$message.error('验证码不可以为空');
                    return;
                }
                api.updateEmailAddress(this.newEmail, this.verifyCode).then(result => {
                    if (result.code === api.success_code) {
                        //更新成功
                        //给出toast
                        this.$message.success(result.message);
                        //重置表单
                        this.verifyCode = '';
                        this.newEmail = '';
                    } else {
                        this.verifyCode = '';
                        this.$message.error(result.message);
                        //给出提示。
                    }
                });

            }
        }
    }
</script>
<style>
    .email-get-verify-code-btn {
        margin-left: 20px;
    }

    .settings-email-box .el-input {
        max-width: 250px;
    }
</style>
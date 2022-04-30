<template>
    <div>
        <Sign>
            <div class="animate__animated animate__backInRight">
                <h2
                    class="font-bold text-2xl xl:text-3xl text-center xl:text-left text-blue-600"
                >
                    登录
                </h2>
                <a-form :model="userModel" autocomplete="off">
                    <div class="mt-6">
                        <a-form-item
                            name="userName"
                            :rules="[
                                {
                                    required: true,
                                    message: '请输入用户名/邮箱地址！'
                                }
                            ]"
                        >
                            <a-input
                                v-model:value="userModel.userName"
                                type="text"
                                placeholder="Username/Email"
                                size="large"
                            >
                                <template #prefix>
                                    <user-outlined />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item
                            name="password"
                            :rules="[
                                {
                                    required: true,
                                    message: '请输入密码！'
                                }
                            ]"
                        >
                            <a-input-password
                                v-model:value="userModel.password"
                                placeholder="Password"
                                size="large"
                            >
                                <template #prefix>
                                    <LockOutlined two-tone-color="#eb2f96" />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item
                            name="captcha"
                            :rules="[
                                {
                                    required: true,
                                    message: '请输入图灵验证码！'
                                }
                            ]"
                        >
                            <div class="flex items-center text-gray-700">
                                <div class="inline-flex items-center mr-2">
                                    <a-input
                                        v-model:value="userModel.captcha"
                                        type="text"
                                        placeholder="Captcha"
                                        size="large"
                                    >
                                        <template #prefix>
                                            <KeyOutlined />
                                        </template>
                                    </a-input>
                                </div>

                                <a-image
                                    class="cursor-pointer"
                                    @click="changeVerifyCode"
                                    :preview="false"
                                    :src="captchaValue"
                                />
                            </div>
                        </a-form-item>
                        <a-form-item name="remember">
                            <div class="flex items-center text-gray-700">
                                <div class="inline-flex mr-auto">
                                    <a-checkbox
                                        v-model:checked="userModel.remember"
                                    >
                                        记住我
                                    </a-checkbox>
                                </div>
                                <RouterLink class="text-blue-600" to="/signup">
                                    忘记密码？
                                </RouterLink>
                            </div>
                        </a-form-item>
                    </div>
                </a-form>
                <a-button
                    type="primary"
                    block
                    class="w-full inline-flex items-center justify-center focus:outline-none text-white bg-blue-600 hover:bg-green-600 hover:text-white py-2 rounded-md active:cursor-wait"
                    :disabled="disabled"
                    @click="submit"
                >
                    <template #icon>
                        <LoadingOutlined v-if="isLoading" />
                        <span v-else>登录</span>
                    </template>
                </a-button>
                <div class="text-center xl:text-right mt-4 md:my-4">
                    没有账户？
                    <RouterLink class="text-blue-600" to="/signup">
                        创建账户
                    </RouterLink>
                </div>
            </div>
        </Sign>
    </div>
</template>
<script setup lang="ts" name="SignIn">
import { reactive, ref, computed } from 'vue';
import {
    UserOutlined,
    LockOutlined,
    KeyOutlined,
    LoadingOutlined
} from '@ant-design/icons-vue';
import { message, notification } from 'ant-design-vue';
import Sign from '../../../layout/default/sign/Sign.vue';
import UserModel from '../../../types/login';
import { useUserStore } from '../../../store/modules/user';

// 接口地址
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
// 使用pinia
const userStore = useUserStore();
// 登录表单
const userModel = reactive<UserModel>({
    userName: '',
    password: '',
    captcha: '',
    remember: false
});
// 加载
let isLoading = ref(false);
// 登录按钮禁用
const disabled = computed(() => {
    return !(
        userModel.userName &&
        userModel.password &&
        userModel.captcha &&
        userModel.remember
    );
});
// 获取图灵验证码
let captchaValue = ref<string>();
const getCaptchaValue = async () => {
    captchaValue.value = `${VITE_BASE_URL}/user/captcha`;
};
// 切换验证码
const changeVerifyCode = () => {
    const isDate: string = String(new Date()); // 时间类型格式化
    captchaValue.value = `${captchaValue.value}?random=${Date.parse(isDate)}`;
};
getCaptchaValue();
// 登录提交
const submit = async (): Promise<void> => {
    isLoading.value = false;
    const result: any = await userStore.doLogin({
        userName: userModel.userName,
        password: userModel.password,
        captcha: userModel.captcha
    });
    console.log('result :>> ', result);
    if (result.code === 20000) {
        notification.success({
            message: `欢迎您！系统管理员`,
            description: `欢迎使用博客管理系统`
        });
        isLoading.value = true;
    } else {
        notification.error({
            message: `登录失败！${result.message}`,
            description: `您输入的信息有误哦！`
        });
        isLoading.value = false;
    }
    isLoading.value = false;
};
</script>
<style lang="scss" scoped></style>

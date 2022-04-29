<template>
    <div>
        <Sign>
            <h2
                class="font-bold text-2xl xl:text-3xl text-center xl:text-left text-blue-600"
            >
                登录
            </h2>
            <a-form :model="userModel" autocomplete="off">
                <div class="mt-6">
                    <a-form-item
                        name="username"
                        :rules="[
                            {
                                required: true,
                                message: '请输入用户名/邮箱地址！'
                            }
                        ]"
                    >
                        <a-input
                            v-model:value="userModel.username"
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
                            <div class="inline-flex items-center mr-auto">
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
                            <div class="text-center">123456</div>
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
                    <PoweroffOutlined v-if="isLoading" />
                    <span v-else>登录</span>
                </template>
            </a-button>
            <div class="text-center xl:text-right mt-4 md:my-4">
                没有账户？
                <RouterLink class="text-blue-600" to="/signup">
                    创建账户
                </RouterLink>
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
    PoweroffOutlined
} from '@ant-design/icons-vue';
import Sign from '../../../layout/default/sign/Sign.vue';
import UserModel from '../../../types/login';
// 登录表单
const userModel = reactive<UserModel>({
    username: '',
    password: '',
    captcha: '',
    remember: false
});
// 加载
let isLoading = ref(false);
// 登录按钮禁用
const disabled = computed(() => {
    return !(
        userModel.username &&
        userModel.password &&
        userModel.captcha &&
        userModel.remember
    );
});

const submit = () => {
    isLoading.value = false;
    // 提交成功之后改为true
};
</script>
<style lang="scss" scoped></style>

<!--
 * @Author: bugdr
 * @Date: 2022-04-29 16:22:04
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 18:08:57
 * @FilePath: \blog-admin\src\layout\default\sign\Sign.vue
 * @Description: 
-->
<template>
    <div class="login xl:bg-white">
        <div class="container mx-auto">
            <div class="xl:grid grid-cols-2 gap-4">
                <div
                    class="hidden xl:flex flex-col h-screen my-auto md: ml-36 relative"
                >
                    <div class="flex items-center z-0 absolute top-12">
                        <img class="w-12" src="../../../assets/svg/logo.svg" />
                        <span class="text-white text-3xl ml-3 font-extrabold">
                            Romantic knowledge
                        </span>
                    </div>
                    <figure class="my-auto">
                        <img
                            src="../../../assets/svg/business.svg"
                            class="w-full h-full"
                            alt="leafage"
                        />
                    </figure>
                    <div class="z-0 absolute bottom-24">
                        <p class="text-white font-medium text-xl leading-tight">
                            浪漫知识
                        </p>
                        <p class="text-gray-300">
                            使用 vue3、vite.js、pnpm、pinia、ts 等技术框架构建
                        </p>
                    </div>
                </div>
                <div class="h-screen flex px-2">
                    <div
                        class="max-w-xs m-auto bg-white xl:bg-transparent px-4 py-8 xl:p-0 rounded-md shadow-sm xl:shadow-none w-full"
                    >
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="Sign"></script>
<style lang="scss" scoped>
@media (min-width: 1280px) {
    .login:before {
        content: '';
        margin-left: -48%;
        min-width: 768px;
        @apply absolute w-full h-full bg-no-repeat bg-right;
        background-image: url(../../../assets/svg/background.svg);
        background-size: auto 100%;
    }
}
</style>

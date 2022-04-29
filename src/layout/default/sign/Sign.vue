<template>
    <div class="login xl:bg-yellow-50">
        <div class="container mx-auto">
            <div class="xl:grid grid-cols-2 gap-4">
                <div class="hidden xl:flex flex-col h-screen my-auto md: ml-36 relative"></div>
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
<script setup lang="ts" name="Sign">
import { ref } from 'vue';
</script>
<style lang="scss" scoped></style>

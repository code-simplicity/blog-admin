<template>
    <div class="flex bg-orange-900">
        <RouterView>
            <template #default="{ Component, route }">
                <transition mode="out-in" appear>
                    <keep-alive>
                        <component :is="Component" :key="route.fullPath" />
                    </keep-alive>
                </transition>
            </template>
        </RouterView>
    </div>
</template>
<script setup name="PageLayout" lang="ts">
import { ref } from 'vue';
</script>
<style lang="scss" scoped></style>

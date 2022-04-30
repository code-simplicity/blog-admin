<!--
 * @Author: bugdr
 * @Date: 2022-04-29 15:38:15
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 20:12:07
 * @FilePath: \blog-admin\src\layout\default\index.vue
 * @Description: 
-->
<template>
    <div class="h-screen">
        <div class="flex flex-row sm-g-h md:h-full overflow-auto">
            <Sider />
            <div class="flex-row md:w-full">
                <Header />
                <Content />
            </div>
        </div>
    </div>
</template>
<script setup name="Layout" lang="ts">
import { ref } from 'vue';
import Header from './header/indev.vue';
import Sider from './sider/index.vue';
import Content from './content/index.vue';
</script>
<style scoped>
#components-layout-demo-basic .code-box-demo {
    text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
    color: #fff;
    background: #7dbcea;
}
[data-theme='dark'] #components-layout-demo-basic .ant-layout-header {
    background: #6aa0c7;
}
[data-theme='dark'] #components-layout-demo-basic .ant-layout-footer {
    background: #6aa0c7;
}
#components-layout-demo-basic .ant-layout-footer {
    line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
    color: #fff;
    line-height: 120px;
    background: #3ba0e9;
}
[data-theme='dark'] #components-layout-demo-basic .ant-layout-sider {
    background: #3499ec;
}
#components-layout-demo-basic .ant-layout-content {
    min-height: 120px;
    color: #fff;
    line-height: 120px;
    background: rgba(16, 142, 233, 1);
}
[data-theme='dark'] #components-layout-demo-basic .ant-layout-content {
    background: #107bcb;
}
#components-layout-demo-basic > .code-box-demo > .ant-layout + .ant-layout {
    margin-top: 48px;
}
</style>

<template>
    <div class="right-content-container">
        <!--显示我们的内容-->
        <div class="content-title-box" v-text="$route.name"></div>
            <div class="content-container-box">
                <router-view></router-view>
            </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .right-content-container {
        min-width: 1140px;
    }
    .content-title-box{
        padding: 10px;
        font-size: 20px;
        line-height: 20px;
    }

    .content-container-box{

    }
</style>

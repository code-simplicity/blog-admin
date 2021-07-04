<template>
    <div>
        <!--显示我们的内容-->
        <el-container>
            <el-header id="admin-header-box">
                <topHeader></topHeader>
            </el-header>
            <el-container class="main-container">
                <el-aside id="left-menu-list-box" width="180px">
                    <left-menu></left-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        mounted() {
            //动态设置侧边菜单栏高度
            // let leftMenuBox = document.getElementById("left-menu-list-box");
            // let adminHeaderBox = document.getElementById("admin-header-box");
            // let dy = window.innerHeight - adminHeaderBox.offsetHeight;
            // // window.console.log('dy ==> ' + dy);
            // if (leftMenuBox && adminHeaderBox) {
            //     leftMenuBox.style.height = dy + 'px';
            // }
        }
    }
</script>

<style>
    #left-menu-list-box {
        z-index: 2000;
    }
    .main-container {
        position: absolute;
        top: 46px;
        bottom: 0;
        width: 100%;
    }
    #left-menu-list-box .el-menu{
        border-right: none;
        background-color: #EBEDF0;
    }

    .el-header {
        background-color: cornflowerblue;
        line-height: 46px;
        height: 46px !important;
    }

    .el-aside {
        border-right: solid 1px #e6e6e6;
        line-height: 200px;
        background: #EBEDF0;
    }

    .el-main {
        padding: 0;
    }

</style>

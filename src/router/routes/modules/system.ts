import { RouteRecordRaw } from "vue-router";
// 系统目录，包含登录，注册等页面
const route: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: "Login",
        meta: {
            title: "登录"
        },
        component: () => import("../../views/system/sign/signIn.vue")
    }
]
export default route
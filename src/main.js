import Vue from 'vue'
import App from "./App.vue"
import router from './router'


/*饿了么ui*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import leftMenu from './layout/left-menu';
import topHeader from './layout/top-header';
/*第三方阿里巴巴icon*/
import './assets/icon/iconfont.css'
import constants from './utils/constants'

/*导入Markdown编辑器*/
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'

// Vue.use(mavonEditor);
Vue.config.productionTip = false;
Vue.prototype.blog_constant = constants;

Vue.use(ElementUI);
Vue.component('leftMenu',leftMenu);
Vue.component('topHeader',topHeader);
import {checkToken,success_code} from './api/api';

router.beforeEach((to, from, next) => {
  // window.console.log(to);
  // window.console.log(from);
  // window.console.log(next);
  //如果是登陆的界面则需要放行，否者检查用户角色
  if (to.path === '/login') {
    //如果要做得更好一点，如果用户要跳转到登录页面
    //当前已经登录了，则没必要再到登录界面了，除非用户点击退出登录
    //如果已经登录，根据角色判断页面跳转。
    next();
  } else {
    //否则检查用户角色
    checkToken().then(result => {
      console.log(result);
      if (result.code === success_code) {
        window.localStorage.setItem('avatar', result.data.avatar);
        window.localStorage.setItem('userName', result.data.userName);
        //成功，判断用户角色
        //如果是管理员，放行
        //如果是普通用户，跳转到门户首页
        if (result.data.roles === 'role_admin') {
          next();
        } else {
          // location.href ='http://www.bugdr.cn';
          location.href = this.blog_constant.portalBaseUrl;
        }
      } else {
        //跳转到登录界面
        next({
          path: '/login'
        })
      }

    });
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

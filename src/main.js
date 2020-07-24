import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//axios
var axios = require('axios')
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8"

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = store.state.token;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error) {
            // 清除token 如果不是register/login, 跳转至login
            store.commit('logout')
            router.currentRoute.path !== '/login' &&
                router.currentRoute.path !== '/register' &&
                router.replace({
                    path: '/login',
                    query: { redirect: router.currentRoute.path }
                })
        }
        return Promise.reject(error.response.data)
    }
)

// md5
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.prototype.notify = function(type, msg) {
    this.$message({
        center: true,
        dangerouslyUseHTMLString: true,
        type: type,
        message: '<strong style="color:teal">' + msg + '</strong>',
    });
};

// global constant
import global from './components/GLOBAL'
Vue.prototype.GLOBAL = global

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
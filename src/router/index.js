import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import PictureDetail from '@/pages/PictureDetail'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: "Home",
        component: Home
    }, {
        path: '/login',
        name: "Login",
        component: Login
    }, {
        path: '/register',
        name: "Register",
        component: Register
    }, {
        path: "/picture-detail/:pictureID",
        name: "PictureDetail",
        component: PictureDetail
    }]
})
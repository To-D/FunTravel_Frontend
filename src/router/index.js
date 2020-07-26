import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import PictureDetail from '@/pages/PictureDetail'
import Search from "@/pages/Search"
import MyFavorite from "@/pages/MyFavorite"
import test from "@/components/ShowPicture"


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
    }, {
        path: "/search",
        name: "Search",
        component: Search
    }, {
        path: "/my-favorite",
        name: "MyFavorite",
        component: MyFavorite
    }, {
        path: "/test",
        name: "test",
        component: test
    }]
})
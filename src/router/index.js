import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import PictureDetail from '@/pages/PictureDetail'
import Search from "@/pages/Search"
import MyFavorite from "@/pages/MyFavorite"
import Upload from "@/pages/Upload"
import Modify from "@/pages/Modify"
import MyPictures from "@/pages/MyPictures"
import MyFriends from "@/pages/MyFriends"

import Chat from "@/components/Chat"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: "Home",
        component: Home,
        meta: { title: "FunTravel" }
    }, {
        path: '/login',
        name: "Login",
        component: Login,
        meta: { title: "FunTravel-Log in" }
    }, {
        path: '/register',
        name: "Register",
        component: Register,
        meta: { title: "FunTravel-Register" }
    }, {
        path: "/picture-detail/:pictureID",
        name: "PictureDetail",
        component: PictureDetail,
        meta: { title: "FunTravel-PictureDetail" }
    }, {
        path: "/search",
        name: "Search",
        component: Search,
        meta: { title: "FunTravel-Search" }
    }, {
        path: "/my-favorite",
        name: "MyFavorite",
        component: MyFavorite,
        meta: { title: "FunTravel-MyFavorite" }
    }, {
        path: '/upload',
        name: "Upload",
        component: Upload,
        meta: { title: "FunTravel-Upload" }
    }, {
        path: '/modify/:pictureID',
        name: "Modify",
        component: Modify,
        meta: { title: "FunTravel-Modify" }
    }, {
        path: '/my-pictures',
        name: "MyPictures",
        component: MyPictures,
        meta: { title: "FunTravel-MyPictures" }
    }, {
        path: "/my-friends",
        name: "MyFriends",
        component: MyFriends,
        meta: { title: "FunTravel-MyFriends" }
    }, {
        path: "/chat",
        name: "Chat",
        component: Chat,
        meta: { title: "FunTravel-Chat" }
    }]
})
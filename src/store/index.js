import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        username: localStorage.getItem('username') || null,
    },
    mutations: {
        login(state, userInfo) {
            localStorage.setItem('token', userInfo.token)
            state.token = userInfo.token
            localStorage.setItem('username', userInfo.username)
            state.username = userInfo.username
        },
        logout(state) {
            localStorage.removeItem('token')
            state.token = null

            localStorage.removeItem('username')
            state.username = null
        }
    },
    actions: {}
})
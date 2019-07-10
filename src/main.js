import Vue from 'vue'
import App from './App.vue'
import Content from './view/Content.vue'
import Home from './view/Home.vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(MintUI)

const routes = [{
    path: "/",
    name: "home",
    component: Home,
    meta: {
        keepAlive: true // 需要被缓存
    }
}, {
    path: "/content",
    name: "content",
    component: Content,
    meta: {
        keepAlive: false // 不需要被缓存
    }
}]

const router = new VueRouter({
    routes
})


new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { addCookie, getCookie, delCookie } from './utils/cookie.js'
import './utils/normalize.css'
import { changeTitle } from '@/utils'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import uploader from 'vue-simple-uploader'
import Vuex from 'vuex'
import axios from 'axios'
import VJstree from 'vue-jstree'

Vue.use(VJstree)
Vue.use(Vuex)
Vue.use(contentmenu)
Vue.use(uploader)
Vue.config.productionTip = false


const ADD_TOKEN = 'ADD_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';
let store = new Vuex.Store({
  state: {
    token: '',
    userId: ''
  },
  mutations: {
    [ADD_TOKEN](state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    [REMOVE_TOKEN](state, token) {
      localStorage.removeItem("token");
      state.token = token;
    }
  },
  actions: {

  }
})

//http request拦截器
axios.interceptors.request.use(
  config => {
    var token = localStorage.getItem('token');
    store.state.token = token;
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

//http response拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('REMOVE_TOKEN');
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.afterEach(route => {
  changeTitle(route.meta.title)
})

//全局调用cookie方法 this.$cookieStore.addCookie( 'name' , 1)
Vue.prototype.$cookieStore = {
  addCookie,
  getCookie,
  delCookie
}
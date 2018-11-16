import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { addCookie, getCookie, delCookie } from './utils/cookie.js'
import './utils/buttons.css'
import './utils/normalize.css'
import { changeTitle } from '@/utils'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import uploader from 'vue-simple-uploader'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(contentmenu)
Vue.use(uploader)
Vue.config.productionTip = false

const ADD_TOKEN = 'ADD_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';
let store = new Vuex.Store({
  state: {
    token: "",
    userId: ""
  },
  mutations: {
    [ADD_TOKEN](state, token) {
      sessionStorage.setItem("token", token);
      state.token = token;
    },
    [REMOVE_TOKEN](state, token) {
      sessionStorage.removeItem("token", token);
      state.token = token;
    }
  },
  actions: {

  }
})

router.beforeEach((to, from, next) => {
  if (null != sessionStorage.getItem("token")) {
    store.state.token = sessionStorage.getItem("token");
  }

  if (to.meta.requireAuth) {
    if (store.state.token !== "") {
      next();
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  }else{
    next();
  }
})

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
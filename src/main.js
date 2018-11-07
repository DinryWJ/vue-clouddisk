import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { addCookie, getCookie, delCookie } from './utils/cookie.js'

import './utils/normalize.css'
import { changeTitle } from '@/utils'

Vue.config.productionTip = false

new Vue({
  router,
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
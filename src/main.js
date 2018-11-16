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
import store from './store'

Vue.use(contentmenu)
Vue.use(uploader)
Vue.config.productionTip = false

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
import Vue from 'vue'
import Router from 'vue-router'
import layout from "./views/layout.vue";

Vue.use(Router)

const routerMap = [{
  path: "/",
  component: layout,
  children: [{
    path: '/',
    name: "home",
    meta: {
      title: "首页"
    },
    component: () =>
      import('./views/base/home.vue')
  }]
}]

const sideRoutes = [{
  path: "/",
  component: layout,
  children: [{
    path: '/',
    name: "home2",
    meta: {
      title: "首页"
    },
    component: () =>
      import('./views/base/home.vue')
  }]

}]
const routes = [...routerMap, ...sideRoutes]
var router = new Router({
  routes
})
export default router;
export { sideRoutes }
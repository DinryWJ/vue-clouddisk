import Vue from 'vue'
import Router from 'vue-router'
import index from "./views/index.vue";

import main from "./views/main.vue";

Vue.use(Router)

const mainRoutes = [{
  path: '/',
  name: "login",
  meta: {
    title: "登录",
    requireAuth: false
  },
  component: () =>
    import('./views/login/login.vue')
}, {
  path: '/register',
  name: "register",
  meta: {
    title: "注册",
    requireAuth: false
  },
  component: () =>
    import('./views/login/register.vue')
}, {
  path: '/upload',
  name: "upload",
  meta: {
    title: "上传",
    requireAuth: true
  },
  component: () =>
    import('./views/disk/uploader.vue')
}, {
  path: "/disk",
  component: index,
  children: [{
    path: '/disk',
    meta: {
      title: "首页"
    },
    component: main,
    children: [{
      path: '/disk/home',
      name: "home",
      meta: {
        title: "首页",
        requireAuth: true
      },
      component: () =>
        import('./views/disk/home.vue')
    }, {
      path: '/disk/myshare',
      name: "myshare",
      meta: {
        title: "管理我的分享",
        requireAuth: true
      },
      component: () =>
        import('./views/disk/myshare.vue')
    }, {
      path: '/disk/recyclebin',
      name: "recyclebin",
      meta: {
        title: "回收站",
        requireAuth: true
      },
      component: () =>
        import('./views/disk/recyclebin.vue')
    }, {
      path: '/disk/about',
      name: "about",
      meta: {
        title: "关于",
        requireAuth: true
      },
      component: () =>
        import('./views/disk/about.vue')
    }]
  }, {
    path: '/share',
    name: "share",
    meta: {
      title: "分享",
      requireAuth: true
    },
    component: () =>
      import('./views/base/share.vue')
  }, {
    path: '/explore',
    name: "explore",
    meta: {
      title: "探索",
      requireAuth: true
    },
    component: () =>
      import('./views/base/explore.vue')
  }, {
    path: '/more',
    name: "more",
    meta: {
      title: "更多",
      requireAuth: true
    },
    component: () =>
      import('./views/base/more.vue')





  }]
}]

const adminRoutes = [{
  path: "/",
  component: index,
  children: [{
    path: '/',
    name: "home2",
    meta: {
      title: "首页",
    },
    component: () =>
      import('./views/disk/home.vue')
  }]

}]

const routes = [...mainRoutes, ...adminRoutes]
var router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("token") != null) {
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


export default router;
export {
  sideRoutes
}
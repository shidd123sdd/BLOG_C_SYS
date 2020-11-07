import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/settings/label"
      },
      {
        path: "/settings",
        name: "settings",
        meta: { icon: "setting", title: "配置中心" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/settings/label",
            name: "label",
            meta: { title: "标签设置" },
            component: () =>
              import(
                /* webpackChunkName: "settings" */ "../views/settings/Label.vue"
              )
          },
          {
            path: "/settings/sort",
            name: "sort",
            meta: { title: "分类设置" },
            component: () =>
              import(
                /* webpackChunkName: "settings" */ "../views/settings/Sort.vue"
              )
          }
        ]
      },
      {
        path: "/article",
        name: "article",
        meta: { icon: "file-text", title: "撰写文章" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/article/noteList",
            name: "note",
            meta: { title: "笔记列表" },
            component: () =>
              import(
                /* webpackChunkName: "article" */ "../views/article/Note.vue"
              )
          },
          {
            path: "/article/addNode",
            name: "addNote",
            meta: { title: "新增笔记" },
            component: () =>
              import(
                /* webpackChunkName: "article" */ "../views/article/AddNote.vue"
              )
          },
          {
            path: "/article/artList",
            name: "artList",
            meta: { title: "随笔列表" },
            component: () =>
              import(
                /* webpackChunkName: "article" */ "../views/article/ArtList.vue"
              )
          },
          {
            path: "/article/addArt",
            name: "addArt",
            meta: { title: "新增随笔" },
            component: () =>
              import(
                /* webpackChunkName: "article" */ "../views/article/AddArt.vue"
              )
          },
          {
            path: "/article/updateNote",
            name: "updateNote",
            hideInMenu: true,
            component: () =>
              import(
                /* webpackChunkName: "settings" */ "../views/article/AddNote.vue"
              )
          },
          {
            path: "/article/updateArt",
            name: "updateArt",
            hideInMenu: true,
            component: () =>
              import(
                /* webpackChunkName: "settings" */ "../views/article/AddArt.vue"
              )
          }
        ]
      }
    ]
  },
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Register.vue")
      }
    ]
  }
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }

  const notLogin =
    sessionStorage.getItem("token") == null ||
    sessionStorage.getItem("token") === "";
  if (notLogin && to.path !== "/user/login") {
    next({
      path: "/user/login"
    });
    NProgress.done();
  }

  next();
});
router.afterEach(() => {
  NProgress.done();
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default router;

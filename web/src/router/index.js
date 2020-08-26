import Vue from "vue";
import VueRouter from "vue-router";
import mainView from "../views/mainView.vue";
import map from "../views/map.vue";
import detail from "../views/detail.vue";
import articles from "../views/articles.vue";
import allArt from "../views/allArt.vue";
import profile from "../views/profile.vue";
import editArt from "../views/editArt/editArt.vue";
import editArting from "../views/editArt/editArting.vue";
import editUser from "../views/editUser.vue";
import updateLost from "../views/editArt/updateLost.vue";
import updateFound from "../views/editArt/updateFound.vue";

import addFound from "../views/add/addFound.vue";
import addLost from "../views/add/addLost.vue";

import editAvatar from "../views/editUser/editAvatar.vue";
import editName from "../views/editUser/editName.vue";
import editPassword from "../views/editUser/editPassword.vue";
import editQQ from "../views/editUser/editQQ.vue";
import editTel from "../views/editUser/editTel.vue";

import login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "map",
    meta: {
      keepAlive: true, //需要被缓存的组件
      isPublic: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      keepAlive: false, //需要被缓存的组件
      isPublic: true,
    },
  },
  {
    path: "/area",
    name: "detail",
    component: detail,
    meta: {
      keepAlive: false, //不需要被缓存的组件
      isPublic: true,
    },
  },
  {
    path: "/articles/:kind/:id",
    name: "articles",
    component: articles,
    props: true,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/editArt/:kind/:id",
    name: "editArt",
    component: editArt,
    props: true,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/editArting/:kind/:id",
    name: "editArt",
    component: editArting,
    props: true,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/editUser",
    name: "editUser",
    component: editUser,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/editAccount/avatar",
    name: "editAvatar",
    component: editAvatar,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/editAccount/name",
    name: "editName",
    component: editName,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/editAccount/password",
    name: "editPassword",
    component: editPassword,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/editAccount/qq",
    name: "editQQ",
    component: editQQ,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/editAccount/tel",
    name: "editTel",
    component: editTel,
    meta: {
      keepAlive: false, //需要被缓存的组件
    },
  },
  {
    path: "/add/lost",
    name: "addLost",
    component: addLost,
    meta: {
      keepAlive: false, //不需要被缓存的组件
    },
  },
  {
    path: "/add/found",
    name: "addFound",
    component: addFound,
    meta: {
      keepAlive: false, //不需要被缓存的组件
    },
  },
  {
    path: "/updateLost/:id",
    name: "updateLost",
    component: updateLost,
    meta: {
      keepAlive: false, //不需要被缓存的组件
    },
    props: true,
  },
  {
    path: "/updateFound/:id",
    name: "updateFound",
    component: updateFound,
    meta: {
      keepAlive: false, //不需要被缓存的组件
    },
    props: true,
  },
  {
    path: "/map",
    name: "mainView",
    component: mainView,
    meta: {
      keepAlive: true,
    },
    children: [
      {
        path: "/",
        name: "map",
        component: map,
        meta: {
          keepAlive: true,
          isPublic: true,
        },
      },
      {
        path: "/allArt",
        name: "allArt",
        component: allArt,
        meta: {
          keepAlive: true,
          isPublic: true,
        },
      },
      {
        path: "/allArt/:search",
        name: "allArt",
        component: allArt,
        meta: {
          keepAlive: true,
          isPublic: true,
        },
        props: true,
      },
      {
        path: "/profile",
        name: "profile",
        component: profile,
        meta: {
          keepAlive: true,
          isPublic: true,
        },
      },
    ],
  },
];

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (from.name == "addLost" || from.name == "addFound") {
    to.meta.keepAlive = false;
  }
  if (from.name == "editArt") {
    to.meta.keepAlive = false;
  }
  if (from.name == "editUser") {
    to.meta.keepAlive = false;
  }
  if (!to.meta.isPublic && !localStorage.usertoken) {
    Vue.prototype.$toast("请先登录");
    return next("/login");
  }
  next();
});

export default router;

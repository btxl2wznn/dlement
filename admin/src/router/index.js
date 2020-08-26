import Vue from "vue";
import VueRouter from "vue-router";
import mainView from "../views/mainView.vue";
import placeEdit from "../views/place/placeEdit.vue";
import placeList from "../views/place/placeList.vue";
import lostEdit from "../views/lost/lostEdit.vue";
import lostList from "../views/lost/lostList.vue";
import foundEdit from "../views/found/foundEdit.vue";
import foundList from "../views/found/foundList.vue";
import usersEdit from "../views/user/userEdit.vue";
import usersList from "../views/user/userList.vue";
import adminEdit from "../views/adminUser/adminUserEdit.vue";
import adminList from "../views/adminUser/adminUserList.vue";
import Login from "../views/Login/login.vue";
import welcome from "../views/welcome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isPublic: true },
  },
  {
    path: "/",
    name: "mainView",
    component: mainView,
    children: [
      { path: "/", component: welcome },
      { path: "/place/create", component: placeEdit },
      { path: "/place/list", component: placeList },
      { path: "/place/edit/:id", component: placeEdit, props: true },

      { path: "/lost/create", component: lostEdit },
      { path: "/lost/list", component: lostList },
      { path: "/lost/edit/:id", component: lostEdit, props: true },

      { path: "/found/create", component: foundEdit },
      { path: "/found/list", component: foundList },
      { path: "/found/edit/:id", component: foundEdit, props: true },

      { path: "/users/create", component: usersEdit },
      { path: "/users/list", component: usersList },
      { path: "/users/edit/:id", component: usersEdit, props: true },

      { path: "/admins/create", component: adminEdit },
      { path: "/admins/list", component: adminList },
      { path: "/admins/edit/:id", component: adminEdit, props: true },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;

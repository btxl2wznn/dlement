import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueAwesomeSwiper from "vue-awesome-swiper";

// import style
//import "swiper/css/swiper.css";
// If you use Swiper 6.0.0 or higher
import "swiper/swiper-bundle.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

Vue.config.productionTip = false;

import "./assets/scss/style.scss";
import "./assets/css/normalize.css";
import "./assets/iconfont/iconfont.css";

import Vant from "vant";
import "vant/lib/index.css";
import http from "./http";

Vue.prototype.$http = http;

Vue.use(Vant);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

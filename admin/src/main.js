import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

//const http = require("./http");
import http from "./http";

Vue.prototype.$http = http;

Vue.config.productionTip = false;

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ""}`,
      };
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

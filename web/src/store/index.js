import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    save_userInfo(state, data) {
      //state.userInfo = data;
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    },
  },
  actions: {
    save_userInfo(state, data) {
      state.userInfo = data;
    },
  },
  modules: {},
});

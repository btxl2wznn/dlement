<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.path" v-if="this.$route.meta.keepAlive"></router-view>
      <!--这里是会被缓存的组件-->
    </keep-alive>
    <router-view :key="$route.path" v-if="!this.$route.meta.keepAlive"></router-view>
    <!-- <keep-alive v-if="this.$route.meta.keepAlive" exclude="detail, editAccount, add">
      <router-view></router-view>
    </keep-alive>-->
  </div>
</template>



<script>
export default {
  name: "app",
  components: {},
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
  mounted() {
    if (!this._isMobile()) {
      this.$toast("请在移动端打开");
    }
  },
};
</script>

<style>
</style>

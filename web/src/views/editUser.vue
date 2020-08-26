<!--  -->
<template>
  <div class="editUser bg-gray-1 text-dark-1">
    <div class="user-header w-100 d-fx ai-center bg-white text-dark-1">
      <i class="iconfont icon-fanhui-copy back f-xl ml-1" @click="back()"></i>
      <div class="f-xl ml-3">账号资料</div>
    </div>
    <div class="content f-xl pl-2 mt-4 bg-white">
      <router-link to="/editAccount/avatar" tag="div">
        <div class="xixian user-avatar d-fx ai-center">
          <div class="flex-1">头像</div>
          <img class="mr-2" width="50px" height="50px" :src="model.avatar" alt />
          <i class="iconfont icon-fanhui-copy back1 text-gray mr-2 f-xl"></i>
        </div>
      </router-link>
      <router-link to="/editAccount/name" tag="div">
        <div class="xixian user-item d-fx ai-center">
          <div class="flex-1">用户名</div>
          <div class="mr-2">{{model.userName}}</div>
          <i class="iconfont icon-fanhui-copy back1 text-gray mr-2 f-xl"></i>
        </div>
      </router-link>
      <router-link to="/editAccount/tel" tag="div">
        <div class="xixian user-item d-fx ai-center">
          <div class="flex-1">电话</div>
          <div class="mr-2">{{model.userTel}}</div>
          <i class="iconfont icon-fanhui-copy back1 text-gray mr-2 f-xl"></i>
        </div>
      </router-link>
      <router-link to="/editAccount/qq" tag="div">
        <div class="xixian user-item d-fx ai-center">
          <div class="flex-1">QQ</div>
          <div class="mr-2">{{model.userQQ}}</div>
          <i class="iconfont icon-fanhui-copy back1 text-gray mr-2 f-xl"></i>
        </div>
      </router-link>
      <router-link to="/editAccount/password" tag="div">
        <div class="xixian user-item d-fx ai-center">
          <div class="flex-1">密码</div>
          <i class="iconfont icon-fanhui-copy back1 text-gray mr-2 f-xl"></i>
        </div>
      </router-link>
      <div @click="leave()" class="user-item d-fx ai-center">
        <div class="flex-1">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "editUser",
  components: {},
  data() {
    //这里存放数据
    return {
      model: {},
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    leave() {
      localStorage.clear();
      this.$router.go(-1);
    },
    async fetch() {
      const id = JSON.parse(localStorage.getItem("userInfo")).id;
      const res = await this.$http.get(`/rest/userInfo/${id}`);
      this.model = res.data[0];
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang="scss" scoped>
.editUser {
  height: 100vh;
}
.user-header {
  height: 50px;
  box-shadow: 0px 4px 10px #ddd;
}

.user-avatar {
  height: 65px;
  position: relative;
}
.user-item {
  height: 45px;
  position: relative;
}
.xixian:after {
  position: absolute;
  content: " ";
  bottom: 0;
  height: 1px;
  width: 100%;
  border-top: 1px solid #ccc;
  transform-origin: 0 0;
  transform: scaleY(0.3);
}
.user-avatar img {
  border-radius: 50%;
}
</style>

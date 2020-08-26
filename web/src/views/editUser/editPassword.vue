<!--  -->
<template>
  <div class="editUser bg-gray-1 text-dark-1">
    <div class="user-header w-100 d-fx ai-center bg-white text-dark-1">
      <i class="iconfont icon-fanhui-copy back f-xl ml-1" @click="back()"></i>
      <div class="f-xl ml-3 flex-1">修改密码</div>
      <div @click="save" class="mr-2 f-xl text-gray">保存</div>
    </div>
    <div class="content f-xl pl-2 mt-3 d-fx ai-center">
      <input
        ref="input"
        v-model="model.password"
        class="input bg-gray-1 text-dark-1 flex-1"
        type="text"
        autofocus="autofocus"
        placeholder="请输入4位以上密码"
      />
      <i @click="clean" class="iconfont icon-quxiao f-xl ml-1 mr-3"></i>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "editAccount",
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
    clean() {
      this.$refs.input.value = "";
    },
    async save() {
      if (this.model.password.length < 4) {
        this.$toast("请输入密码");
      } else {
        this.model.id = JSON.parse(localStorage.getItem("userInfo")).id;
        const res = await this.$http.put("/rest/updatePassword", this.model);
        if (res.data.success) {
          const res = await this.$http.get(`/rest/userInfo/${this.model.id}`);
          let userInfo = res.data[0];
          this.$store.commit("save_userInfo", userInfo);
          this.$toast("修改成功");
          this.$router.go(-1);
        }
      }
    },
  },
  created() {
    console.log("fdasf");
  },
  activated() {
    console.log("activated");
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";
.editUser {
  height: 100vh;
}
.user-header {
  height: 50px;
  box-shadow: 0px 5px 7px #eee;
}
.input {
  border: none;
  line-height: 30px;
  border-bottom: 2px solid map-get($colors, "pink");
}
</style>
